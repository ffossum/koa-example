/* eslint-env mocha */
/* eslint no-unused-expressions: 0 */
import { expect } from 'chai';
import fetch from 'isomorphic-fetch';
import { call, put } from 'redux-saga/effects';
import errorTypes from 'constants/errorType';
import { registerUserRequestSaga } from './registerUserSaga';
import { reloadPage } from 'client/util/clientUtils';
import {
  registerUserFailure,
  registerUser,
} from 'actions/registerUser';
describe('register user saga', () => {
  it('yields an error if password and repeated password do not match', () => {
    const action = registerUser({
      email: 'asdf@asdf.com',
      username: 'asdf',
      password: 'asdf',
      repeatPassword: 'fdsa',
      remember: true,
    });
    const generator = registerUserRequestSaga(action);
    expect(generator.next().value).to.deep.equal(
      put(registerUserFailure({
        repeatPassword: errorTypes.PASSWORDS_DO_NOT_MATCH,
      }))
    );
  });
  it('yields and error if an invalid email is entered', () => {
    const action = registerUser({
      email: 'asdf@asdf',
      username: 'asdf',
      password: 'asdf',
      repeatPassword: 'asdf',
      remember: true,
    });
    const generator = registerUserRequestSaga(action);
    expect(generator.next().value).to.deep.equal(
      put(registerUserFailure({
        email: errorTypes.INVALID_EMAIL,
      }))
    );
  });
  it('performs a POST if entered data is valid', () => {
    const action = registerUser({
      email: 'asdf@asdf.com',
      username: 'asdf',
      password: 'asdf',
      repeatPassword: 'asdf',
      remember: true,
    });
    const generator = registerUserRequestSaga(action);
    expect(generator.next().value).to.deep.equal(
      call(fetch, '/api/register', {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'same-origin',
        body: JSON.stringify({
          email: 'asdf@asdf.com',
          username: 'asdf',
          password: 'asdf',
          remember: true,
        }),
      })
    );
  });
  it('reloads the page if registration is successful', () => {
    const action = registerUser({
      email: 'asdf@asdf.com',
      username: 'asdf',
      password: 'asdf',
      repeatPassword: 'asdf',
      remember: true,
    });
    const generator = registerUserRequestSaga(action);
    generator.next();
    expect(generator.next({ ok: true }).value).to.deep.equal(
      call(reloadPage)
    );
  });

});
