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

export const authSuccessAction = (token, userId) => {
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

export const authAction = ( email, password, isSingUp ) => {
  return dispatch => {
    
    dispatch( authStartAction() )
    
    const data = {
      email,
      password,
      returnSecureToken: true
    }
    
    axios.post( (isSingUp ? firebaseSignUpUrl : firebaseSignInUrl) + firebaseApiKey, data )
      .then(response => {
        
        console.log(response)
        dispatch(authSuccessAction(response.data.idToken, response.data.localId))
      })
      .catch(error => {
        console.log(error)
        dispatch(authFailedAction(error.response.data.error))
      })
  }
}