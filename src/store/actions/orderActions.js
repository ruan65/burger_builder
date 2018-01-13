import * as actionTypes from './ActionTypes'
import AxiosOrder from '../../AxiosOrders'

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

export const purchaseBurger = ( order) => {
  
  console.log('purchase order start', order)
  return dispatch => {
    purchaseBurgerStart()
    AxiosOrder.post('/orders.json', order)
      .then(response => {
        console.log(response.data)
        dispatch(purchaseBurgerSuccess(response.data, order))
      })
      .catch(err => {
        
        console.log(err)
        dispatch(purchaseBurgerFail(err))
      })
  }
}