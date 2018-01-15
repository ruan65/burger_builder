import * as actionTypes from './ActionTypes'
import axios from 'axios'
import { firebaseApiKey } from '../../appSettings'

const firebaseAuthUrl =
  'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key='
  + firebaseApiKey

export const authStartAction = () => {
  return {
    type: actionTypes.AUTH_START
  }
}

export const authSuccessAction = authData => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    authData
  }
}

export const authFailedAction = error => {
  return {
    type: actionTypes.AUTH_FAILED,
    error
  }
}

export const authAction = ( email, password ) => {
  return dispatch => {
    
    dispatch( authStartAction() )
    
    const data = {
      email,
      password,
      returnSecureToken: true
    }
    
    axios.post( firebaseAuthUrl, data )
      .then(response => {
        
        console.log(response)
        dispatch(authSuccessAction(response.data))
      })
      .catch(error => {
        console.log(error)
        dispatch(authFailedAction(error))
      })
  }
}