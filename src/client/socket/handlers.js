import {
  LOG_IN_SUCCESS, logInSuccess,
} from 'actions/login';
import {
  NEW_MESSAGE, newMessage,
} from 'actions/mainChat';
import {
  GAME_CREATED, gameCreated,
  REFRESH_LOBBY, refreshLobby,
} from 'actions/gamesList';
import {
  PLAYER_JOINED, playerJoined,
  PLAYER_LEFT, playerLeft,
} from 'actions/gameRoom';
import {
  NEW_GAME_MESSAGE, newGameMessage,
} from 'actions/gameChat';
export function createHandlers(store) {
  return {
    news: data => {
      console.log(data);
    },
    [NEW_MESSAGE]: message => store.dispatch(newMessage(message)),
    [LOG_IN_SUCCESS]: data => store.dispatch(logInSuccess(data.user, data.games)),
    [GAME_CREATED]: data => store.dispatch(gameCreated(data.game)),
    [REFRESH_LOBBY]: data => store.dispatch(refreshLobby(data.games)),
    [PLAYER_JOINED]: ({ game, user }) => store.dispatch(playerJoined(game.id, user.id)),
    [PLAYER_LEFT]: ({ game, user }) => store.dispatch(playerLeft(game.id, user.id)),
    [NEW_GAME_MESSAGE]: ({ game, message }) => store.dispatch(newGameMessage(game.id, message)),
  };
}
