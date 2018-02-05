import * as actionTypes from './ActionTypes'

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
  return {
    
    type: actionTypes.PURCHASE_BURGER_TRANSACTION_START,
    order,
    token
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

export const fetchOrders = ( token, userId ) => {
  return {
    type: actionTypes.FETCH_ORDERS_TRANSACTION_START,
    token,
    userId
  }
}