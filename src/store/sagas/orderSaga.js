import axios from '../../AxiosOrders'
import { put } from 'redux-saga/effects'
import * as actions from "../actions/indexActions"

export function* purchaseBurgerSaga( action ) {
  
  yield put( actions.purchaseBurgerStart() )
  
  try {
    
    const response = yield axios.post( '/orders.json?auth=' + action.token, action.order )
    
    yield put( actions.purchaseBurgerSuccess( response.data.name, action.order ) )
    
  } catch ( err ) {
    
    yield put( actions.purchaseBurgerFail( err ) )
  }
}


export function* fetchOrdersSaga( action ) {
  
  yield put( actions.fetchOrdersStart() )
  
  const queryParams = '?auth=' + action.token
    + '&orderBy="userId"&equalTo="' + action.userId + '"'
  
  try {
    
    const response = yield axios.get( '/orders.json' + queryParams )
    
    yield put( actions.fetchOrdersSuccess( response.data ) )
    
  } catch ( err ) {
    
    yield put( actions.fetchOrdersFailed( err ) )
  }
}