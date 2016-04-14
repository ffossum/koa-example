/* eslint-env mocha */
/* eslint no-unused-expressions: 0 */

import { expect } from 'chai';
import Immutable from 'immutable';
import sessionReducer from './sessionReducer';
import { logInSuccess, logOutRequest } from 'actions/login';

describe('session reducer', () => {
  it('initializes userId to null', () => {
    const initialState = sessionReducer(undefined, { type: 'INIT' });

    expect(initialState.get('userId')).to.be.null;
  });

  it('holds user id after successful login', () => {
    const action = logInSuccess({ id: '12345' });
    const initialState = Immutable.fromJS({
      userId: null,
    });
    const state = sessionReducer(initialState, action);

    expect(state.get('userId')).to.equal('12345');
  });

  it('reverts back to null after logout', () => {
    const initialState = '12345';
    const state = sessionReducer(initialState, logOutRequest());

    expect(state.get('userId')).to.be.null;
  });
});