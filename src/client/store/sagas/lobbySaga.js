import { getUserData } from 'actions/userDataActions';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import {
  JOIN_LOBBY,
  LEAVE_LOBBY,
  REFRESH_LOBBY_REQUEST,
  CREATE_GAME,
  createGameSuccess,
  GAME_CREATED,
  refreshLobbySuccess,
  refreshLobby,
  UPDATE_GAME,
} from 'actions/lobbyActions';
import { userIdSelector } from 'selectors/commonSelectors';
import { map, flatten } from 'lodash/fp';
import socket from 'client/socket';

export function* refreshLobbySaga(action) {
  const { games } = action.payload;
  const users = flatten(map(game => game.users, games));

  yield put(getUserData(...users));
  yield put(refreshLobbySuccess({ games }));
}

export function* joinLobbySaga(action) {
  try {
    const result = yield call(socket.rpc, action.type);
    if (result) {
      yield put(refreshLobby(result));
    }
  } finally {
    yield call(socket.subscribe, 'lobby');
  }
}

export function* leaveLobbySaga() {
  yield call(socket.unsubscribe, 'lobby');
}

export function* createGameSaga(action) {
  const userId = yield select(userIdSelector);

  if (userId) {
    const payload = {
      ...action.payload,
      user: { id: userId },
    };

    try {
      const game = yield call(socket.rpc, action.type, payload);
      if (game) {
        yield put(createGameSuccess(game));
      }
    } catch (err) {
      // do nothing
    }
  }
}

export function* gameCreatedSaga(action) {
  const { game } = action.payload;
  yield put(getUserData(...game.users));
}

export function* updateGameSaga(action) {
  const { game } = action.payload;
  if (game.users) {
    yield put(getUserData(...game.users));
  }
}

export default function* lobbySaga() {
  yield [
    takeEvery(JOIN_LOBBY, joinLobbySaga),
    takeEvery(LEAVE_LOBBY, leaveLobbySaga),
    takeEvery(REFRESH_LOBBY_REQUEST, refreshLobbySaga),
    takeEvery(CREATE_GAME, createGameSaga),
    takeEvery(GAME_CREATED, gameCreatedSaga),
    takeEvery(UPDATE_GAME, updateGameSaga),
  ];
}
