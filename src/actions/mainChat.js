export const SEND_MESSAGE = 'mainChat/SEND_MESSAGE';
export const NEW_MESSAGE = 'mainChat/NEW_MESSAGE';

export function sendMessage(text) {
  return (dispatch, getState) => {
    const state = getState();
    const loggedInUser = state.get('loggedInUser');
    if (loggedInUser) {

      dispatch({
        type: SEND_MESSAGE,
        payload: {
          text
        },
        meta: {
          socket: true
        }
      });

      const user = state.getIn(['data', 'users', loggedInUser]);
      const message = {
        text,
        time: new Date().toJSON(),
        user: {
          emailHash: user.get('emailHash'),
          username: user.get('username')
        }
      };

      dispatch(newMessage(message));
    }
  };
}

export function newMessage(message) {
  return {
    type: NEW_MESSAGE,
    payload: message
  };
}

export default {
  sendMessage,
  newMessage
};
