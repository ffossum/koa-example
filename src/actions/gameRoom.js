import { userIdSelector } from 'selectors/commonSelectors';

export const JOIN_GAME = 'gameRoom/JOIN_GAME';
export const PLAYER_JOINED = 'gameRoom/PLAYER_JOINED';
export const LEAVE_GAME = 'gameRoom/LEAVE_GAME';
export const PLAYER_LEFT = 'gameRoom/PLAYER_LEFT';

export const ENTER_ROOM = 'gameRoom/ENTER_ROOM';
export const LEAVE_ROOM = 'gameRoom/LEAVE_ROOM';
export const REFRESH_GAME = 'gameRoom/REFRESH';
export const GAME_NOT_FOUND = 'gameRoom/NOT_FOUND';

export const START_GAME = 'gameRoom/START_GAME';
export const GAME_STARTED = 'gameRoom/GAME_STARTED';
export const GAME_ENDED = 'gameRoom/ENDED';

export const CANCEL_GAME = 'gameRoom/CANCEL';
export const GAME_CANCELED = 'gameRoom/CANCELED';

export function refreshGame(game) {
  return {
    type: REFRESH_GAME,
    payload: {
      game,
    },
  };
}

export function gameNotFound(gameId) {
  return {
    type: GAME_NOT_FOUND,
    payload: {
      game: { id: gameId },
    },
  };
}

export function enterRoom(gameId) {
  return {
    type: ENTER_ROOM,
    payload: gameId,
  };
}

export function leaveRoom(gameId) {
  return {
    type: LEAVE_ROOM,
    payload: gameId,
  };
}

export function playerJoined(gameId, userId) {
  return {
    type: PLAYER_JOINED,
    payload: {
      game: { id: gameId },
      user: { id: userId },
    },
  };
}

export function joinGame(gameId) {
  return {
    type: JOIN_GAME,
    payload: gameId,
  };
}

export function playerLeft(gameId, userId) {
  return {
    type: PLAYER_LEFT,
    payload: {
      game: { id: gameId },
      user: { id: userId },
    },
  };
}

export function leaveGame(gameId) {
  return (dispatch, getState) => {
    const userId = userIdSelector(getState());
    if (!userId) {
      return;
    }

    const type = LEAVE_GAME;
    const payload = {
      game: { id: gameId },
      user: { id: userId },
    };
    dispatch({
      type,
      payload,
      meta: {
        deepstream: socket => {
          socket.rpc(type, payload);
        },
      },
    });
  };
}

export function gameStarted(gameId, gameState) {
  return {
    type: GAME_STARTED,
    payload: {
      game: {
        id: gameId,
        state: gameState,
      },
    },
  };
}

export function startGame(gameId) {
  return (dispatch, getState) => {
    const userId = userIdSelector(getState());
    const type = START_GAME;
    const payload = {
      game: { id: gameId },
      user: { id: userId },
    };
    dispatch({
      type,
      payload,
      meta: {
        deepstream: socket => {
          socket.rpc(type, payload);
        },
      },
    });
  };
}

export function gameEnded(gameId) {
  return {
    type: GAME_ENDED,
    payload: {
      game: {
        id: gameId,
      },
    },
  };
}

export function gameCanceled(gameId) {
  return {
    type: GAME_CANCELED,
    payload: {
      game: {
        id: gameId,
      },
    },
  };
}

export function cancelGame(gameId) {
  return (dispatch, getState) => {
    const userId = userIdSelector(getState());
    const type = CANCEL_GAME;
    const payload = {
      game: { id: gameId },
      user: { id: userId },
    };
    dispatch({
      type,
      payload,
      meta: {
        deepstream: socket => {
          socket.rpc(type, payload);
        },
      },
    });
  };
}

export default {
  joinGame,
  playerJoined,
  leaveGame,
  playerLeft,
  enterRoom,
  leaveRoom,
  startGame,
  cancelGame,
};
