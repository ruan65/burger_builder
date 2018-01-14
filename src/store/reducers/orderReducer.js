import * as actionTypes from '../actions/ActionTypes'
import { updateObj } from '../Utils'

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
  error: false
}

const reducer = ( state = initialState, action ) => {
  
  switch ( action.type ) {
    
    case actionTypes.PURCHASE_INIT:
      return updateObj( state, { purchased: false } )
    
    case actionTypes.PURCHASE_BURGER_START:
      return updateObj( state, { loading: true } )
    
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      return updateObj( state, { loading: false, purchased: true } )
    
    case actionTypes.PURCHASE_BURGER_FAILURE:
      return updateObj( state, { loading: false } )
    
    case actionTypes.FETCH_ORDERS_START:
      return updateObj( state, { orders: [], loading: true } )
    
    case actionTypes.FETCH_ORDERS_SUCCESS:
      return updateObj( state, { loading: false, orders: action.orders } )
    
    case actionTypes.FETCH_ORDERS_FAILED:
      return updateObj( state, { loading: false, error: action.error } )
    default:
      return state
  }
}

export default reducer