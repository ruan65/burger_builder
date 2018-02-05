import { logoutSaga, checkAuthTimeoutSaga, authUserSaga, authCheckStateSaga } from './authSaga'
import { initBurgerIngredientsSaga } from './burgerBuilderSaga'
import { purchaseBurgerSaga, fetchOrdersSaga } from './orderSaga'
import { takeEvery, all, takeLatest } from 'redux-saga/effects'
import * as actionTypes from '../actions/ActionTypes'

export function* watchAuth() {
  
  yield all([
    takeEvery( actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga ),
    takeEvery( actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga ),
    takeEvery( actionTypes.AUTH_USER, authUserSaga ),
    takeEvery( actionTypes.AUTH_CHECK_INITIAL_STATE, authCheckStateSaga )
  ])
  
}

export function* watchBurgerBuilder() {
  yield takeEvery( actionTypes.FETCH_INGREDIENTS_FROM_SERVER, initBurgerIngredientsSaga)
}

export function* watchOrders() {
  yield takeLatest( actionTypes.PURCHASE_BURGER_TRANSACTION_START, purchaseBurgerSaga)
  yield takeLatest( actionTypes.FETCH_ORDERS_TRANSACTION_START, fetchOrdersSaga)
}