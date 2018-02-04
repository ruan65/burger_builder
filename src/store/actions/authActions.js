import * as actionTypes from './ActionTypes'
import axios from 'axios'
import { firebaseApiKey } from '../../appSettings'

const firebaseSignInUrl = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key='
const firebaseSignUpUrl = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key='

export const authStartAction = () => {
  return {
    type: actionTypes.AUTH_START
  }
}

export const authSuccessAction = ( token, userId ) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token,
    userId
  }
}

export const authFailedAction = error => {
  return {
    type: actionTypes.AUTH_FAILED,
    error
  }
}

export const logout = () => {
  return { type: actionTypes.AUTH_INITIATE_LOGOUT }
}

export const checkAuthTimeout = ( expirationTime ) => {
  return {
    type: actionTypes.AUTH_CHECK_TIMEOUT,
    expirationTime
  }
}

export const authAction = ( email, password, isSingUp ) => {
  return dispatch => {
    
    dispatch( authStartAction() )
    
    const data = {
      email,
      password,
      returnSecureToken: true
    }
    
    axios.post( ( isSingUp ? firebaseSignUpUrl : firebaseSignInUrl ) + firebaseApiKey, data )
      .then( response => {
        
        console.log( response )
        
        const expirationDate = new Date( new Date().getTime() + response.data.expiresIn * 1000 )
        
        localStorage.setItem( 'bb_token', response.data.idToken )
        localStorage.setItem( 'bb_token_expiration', expirationDate )
        localStorage.setItem( 'bb_userId', response.data.localId )
        
        dispatch( authSuccessAction( response.data.idToken, response.data.localId ) )
        dispatch( checkAuthTimeout( response.data.expiresIn ) )
      } )
      .catch( error => {
        console.log( error )
        dispatch( authFailedAction( error.response.data.error ) )
      } )
  }
}

export const setAuthRedirectAction = ( path ) => {
  return {
    type: actionTypes.AUTH_SET_REDIRECT_PATH,
    path
  }
}

export const authCheckState = () => {
  return dispatch => {
    
    const token = localStorage.getItem( 'bb_token' )
    
    if ( !token ) {
      dispatch( logout() )
    } else {
      const expirationDate = new Date( localStorage.getItem( 'bb_token_expiration' ) )
      
      if ( expirationDate > new Date() ) {
        dispatch( authSuccessAction( token, localStorage.getItem( 'bb_userId' ) ) )
        dispatch( checkAuthTimeout(
          ( expirationDate.getTime() - new Date().getTime() ) / 1000 )
        )
      } else {
        dispatch( logout() )
      }
    }
  }
}