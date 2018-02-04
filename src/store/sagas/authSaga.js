import { put } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import * as actionTypes from "../actions/ActionTypes"
import * as actions from "../actions/indexActions"
import { firebaseApiKey } from "../../appSettings"
import axios from "axios"
import { urls } from '../../Cv'

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

export function* authUserSaga( action ) {
  
  yield put( actions.authStartAction() )
  
  const data = {
    email: action.email,
    password: action.password,
    returnSecureToken: true
  }
  
  try {
    const response = yield axios.post( ( action.isSingUp ?
      urls.firebaseSignUpUrl : urls.firebaseSignInUrl ) + firebaseApiKey, data )
    
    console.log( response )
    
    const expirationDate = yield new Date( new Date().getTime() + response.data.expiresIn * 1000 )
    
    yield localStorage.setItem( 'bb_token', response.data.idToken )
    yield localStorage.setItem( 'bb_token_expiration', expirationDate )
    yield localStorage.setItem( 'bb_userId', response.data.localId )
    
    yield put( actions.authSuccessAction( response.data.idToken, response.data.localId ) )
    yield put( actions.checkAuthTimeout( response.data.expiresIn ) )
    
  } catch ( error ) {
    console.log( error )
    yield put( actions.authFailedAction( error.response.data.error ) )
  }
}