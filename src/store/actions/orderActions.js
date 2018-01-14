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

export const purchaseBurger = ( order ) => {
  
  return ( dispatch ) => {
    
    purchaseBurgerStart()
    
    axios.post( '/orders.json', order )
      .then( response =>
        dispatch( purchaseBurgerSuccess( response.data.name, order ) ) )
      .catch( err =>
        dispatch( purchaseBurgerFail( err ) ) )
  }
}