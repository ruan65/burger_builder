import { logoutSaga, checkAuthTimeoutSaga, authUserSaga, authCheckStateSaga } from './authSaga'
import { initBurgerIngredientsSaga } from './burgerBuilderSaga'
import { purchaseBurgerSaga, fetchOrdersSaga } from './orderSaga'
import { takeEvery } from 'redux-saga/effects'
import * as actionTypes from '../actions/ActionTypes'

export function* watchAuth() {
  yield takeEvery( actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga )
  yield takeEvery( actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga )
  yield takeEvery( actionTypes.AUTH_USER, authUserSaga )
  yield takeEvery( actionTypes.AUTH_CHECK_INITIAL_STATE, authCheckStateSaga )
}

export function* watchBurgerBuilder() {
  yield takeEvery( actionTypes.FETCH_INGREDIENTS_FROM_SERVER, initBurgerIngredientsSaga)
}

export function* watchOrders() {
  yield takeEvery( actionTypes.PURCHASE_BURGER_TRANSACTION_START, purchaseBurgerSaga)
  yield takeEvery( actionTypes.FETCH_ORDERS_TRANSACTION_START, fetchOrdersSaga)
}