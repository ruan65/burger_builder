import * as actionTypes from './ActionTypes'
import axios from '../../AxiosOrders'

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT
  }
}

export const purchaseBurgerSuccess = ( orderId, orderData ) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId,
    orderData
  }
}

export const purchaseBurgerFail = error => {
  console.log( error )
  return {
    type: actionTypes.PURCHASE_BURGER_FAILURE,
    error
  }
}

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START
  }
}

export const purchaseBurger = ( order, token ) => {
  return ( dispatch ) => {
    
    dispatch( purchaseBurgerStart() )
    
    axios.post( '/orders.json?auth=' + token, order )
      .then( response =>
        dispatch( purchaseBurgerSuccess( response.data.name, order ) ) )
      .catch( err => dispatch( purchaseBurgerFail( err ) ) )
  }
}

export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START
  }
}

export const fetchOrdersSuccess = ( orders ) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders
  }
}

export const fetchOrdersFailed = ( error ) => {
  console.log( error )
  return {
    type: actionTypes.FETCH_ORDERS_FAILED,
    error
  }
}

export const fetchOrders = (token) => {
  return dispatch => {
    
    dispatch( fetchOrdersStart() )
    
    axios.get( '/orders.json?auth=' + token)
      .then( response => dispatch( fetchOrdersSuccess( response.data ) ) )
      .catch( err => dispatch( fetchOrdersFailed( err ) ) )
  }
}