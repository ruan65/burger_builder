import axiosBurgerBuilder from '../../AxiosOrders'
import { put } from 'redux-saga/effects'
import * as actions from "../actions/indexActions"
import { fetchOrdersFailed, fetchOrdersStart, fetchOrdersSuccess } from "../actions/orderActions";

export function* initBurgerIngredientsSaga( action ) {
  
  try {
    const response = yield axiosBurgerBuilder.get( '/ingredients.json' )
    
    yield put( actions.setIngredients( response.data ) )
    
  } catch ( error ) {
    yield put( actions.fetchIngredientsFailed() )
  }
}