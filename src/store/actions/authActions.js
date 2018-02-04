import * as actionTypes from './ActionTypes'

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
  return {
    type: actionTypes.AUTH_USER,
    email,
    password,
    isSingUp
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