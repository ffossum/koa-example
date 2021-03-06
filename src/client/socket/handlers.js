// @flow
import {
  SEND_MESSAGE,
  newMessage,
} from 'actions/mainChatActions';
import {
  GAME_CREATED, gameCreated,
  UPDATE_GAME, updateGame,
} from 'actions/lobbyActions';
import {
  PLAYER_JOINED, playerJoined,
  PLAYER_LEFT, playerLeft,
  GAME_STARTED, gameStarted,
  GAME_ENDED, gameEnded,
  GAME_CANCELED, gameCanceled,
} from 'actions/gameRoomActions';
import {
  newGameMessage,
  SEND_GAME_MESSAGE,
} from 'actions/gameChatActions';
import {
  NEW_ACTION, newAction,
} from 'actions/gameActions';

import type { Store } from '../store';

export type SocketEventHandler = (typeAndData: [string, any]) => void;

export function createHandler(store: Store): SocketEventHandler {
  return function socketEventHandler([type, data]) {
    switch (type) {
      case SEND_MESSAGE: store.dispatch(newMessage(data)); break;
      case GAME_CREATED: store.dispatch(gameCreated(data)); break;
      case PLAYER_JOINED: store.dispatch(playerJoined(data.game.id, data.user.id)); break;
      case PLAYER_LEFT: store.dispatch(playerLeft(data.game.id, data.user.id)); break;
      case SEND_GAME_MESSAGE: store.dispatch(newGameMessage(data)); break;
      case UPDATE_GAME: store.dispatch(updateGame(data)); break;
      case GAME_STARTED: store.dispatch(gameStarted(data.game.id, data.game.state)); break;
      case GAME_CANCELED: store.dispatch(gameCanceled(data.game.id)); break;
      case NEW_ACTION: store.dispatch(newAction(data.game, data.patch)); break;
      case GAME_ENDED: store.dispatch(gameEnded(data.game.id)); break;
      default:
    }
  };
}
