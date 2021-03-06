/* @flow */
import fetch from 'isomorphic-fetch';
import {
  filter,
  isEmpty,
  uniq,
} from 'lodash/fp';
import { userDataSelector } from 'selectors/commonSelectors';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import { GET_USER_DATA_REQUEST, getUserDataSuccess } from 'actions/userDataActions';

import type { Action } from 'actions/types';

export function createGetUserDataSaga() {
  const pendingFetches = {};

  return function* getUserDataSaga(action: Action): Generator<*, *, *> {
    if (action.type === GET_USER_DATA_REQUEST) {
      const userIds = action.payload;
      const stateUsers = yield select(userDataSelector);

      const missingUserIds = filter(userId => !stateUsers[userId], uniq(userIds));

      if (!isEmpty(missingUserIds)) {
        missingUserIds.sort();
        const fetchUrl = `/api/users?id=${missingUserIds.join(',')}`;

        if (!pendingFetches[fetchUrl]) {
          pendingFetches[fetchUrl] = true;

          try {
            const res = yield call(fetch, fetchUrl);

            if (res.ok) {
              const json = yield res.json();
              yield put(getUserDataSuccess(json.users));
            }
          } finally {
            delete pendingFetches[fetchUrl];
          }
        }
      }
    }
  };
}

export const getUserDataSaga = createGetUserDataSaga();

export default function* userDataSaga(): Generator<*, *, *> {
  yield [
    takeEvery(GET_USER_DATA_REQUEST, getUserDataSaga),
  ];
}
