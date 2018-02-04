import { logoutSaga, checkAuthTimeoutSaga } from './logoutSaga'
import { takeEvery } from 'redux-saga/effects'
import * as actionTypes from '../actions/ActionTypes'

export function* watchAuth () {
  yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga)
  yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga)
}