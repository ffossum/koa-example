import { watchLogInRequest, watchLogOut } from './loginSagas';
import { watchRegisterUser } from './registerUserSaga';
import { watchUserDataRequest } from './userDataSaga';
import { watchMainChatSendMessage, watchMainChatNewMessage } from './mainChatSaga';
import {
  watchCreateGame,
  watchGameCreated,
  watchJoinLobby,
  watchLeaveLobby,
  watchRefreshLobby,
} from './lobbySaga';
import gameRoomSaga from './gameRoomSaga';

export default function* rootSaga() {
  yield [
    watchLogInRequest,
    watchLogOut,
    watchRegisterUser,
    watchUserDataRequest,
    watchMainChatNewMessage,
    watchMainChatSendMessage,
    watchCreateGame,
    watchGameCreated,
    watchJoinLobby,
    watchLeaveLobby,
    watchRefreshLobby,
    gameRoomSaga(),
  ];
}
