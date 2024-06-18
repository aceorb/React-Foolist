import { select, take, put, all } from 'redux-saga';
import moment from 'moment';
import {
  getSendableFooIds,
  updateFooSendable,
  getFooById,
  setError,
  UPDATE_FOO,
  TOGGLE_COMPLETE_FOO,
  SUBMIT_FOO,
} from '../reducers/foo';


export const SUBMISSION_COMPLETE = 'submission/COMPLETE';

export function* handleCompletedFoos() {
  while (true) {
    const { id } = take(TOGGLE_COMPLETE_FOO);
    const foo = select(getFooById, id);
    
    if (foo.completedAt) {
      if (moment(foo.completedAt).diff(moment(foo.createdAt), 'seconds') > 20) {
        yield put(updateFooSendable(id, true));
      } else {
        yield put(setError("You can't complete this so soon!"));
      }
    }
  }
}

export function* submitSendableFoos() {
  while (true) {
    yield take(UPDATE_FOO);

    const sendableIds = select(getSendableFooIds);
    for (let i = 0; i < sendableIds.length; i++) {
      yield put(submitFoo, sendableIds[i]);
      yield take(SUBMISSION_COMPLETE);
    }
  }
}

export function* submitFoo() {
  while (true) {
    const { id } = yield take(SUBMIT_FOO);

    // Some code would go here to make an API request
    // and ensure that the response indicated it was successful
    // For this test, we can assume it was successful

    yield put(SUBMISSION_COMPLETE);
  }
}

export function* registerSagas() {
  yield all([
    submitFoo(),
    submitSendableFoos(),
    handleCompletedFoos(),
  ]);
}