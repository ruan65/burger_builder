import * as actionTypes from './ActionTypes'
import axios from '../../AxiosOrders'

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

export const authAction = (email, password) => {
  return dispatch => {

    console.log(email, password)
    dispatch(authStartAction())
  }
}