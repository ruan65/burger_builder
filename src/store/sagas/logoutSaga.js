import { put } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import * as actionTypes from "../actions/ActionTypes";
import * as actions from "../actions/indexActions";

export function* logoutSaga( action ) {
  
  yield localStorage.removeItem( 'bb_token' )
  yield localStorage.removeItem( 'bb_token_expiration' )
  yield localStorage.removeItem( 'bb_userId' )
  
  yield put( { type: actionTypes.AUTH_LOGOUT } )
}

export function* checkAuthTimeoutSaga( action ) {
  
  yield delay( action.expirationTime * 1000 )
  yield put( actions.logout() )
}