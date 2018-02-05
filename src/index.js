import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunk from 'redux-thunk'
import './index.css';
import App from './App';
import burgerBuilderReducer from './store/reducers/burgerBuilderReducer'
import orderReducer from './store/reducers/orderReducer'
import authReducer from './store/reducers/authReducer'
import registerServiceWorker from './registerServiceWorker';
import createSagaMiddleware from 'redux-saga'
import { watchAuth, watchBurgerBuilder, watchOrders } from './store/sagas'

const composeEnhancers = process.env.NODE_ENV === 'development' ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose

const rootReducer = combineReducers(
  {
    burgerBuilderReducer,
    orderReducer,
    authReducer
  }
)

const sagaMiddleware = createSagaMiddleware()

const enhancer = composeEnhancers( applyMiddleware( thunk, sagaMiddleware ) )

const store = createStore( rootReducer, enhancer )

sagaMiddleware.run( watchAuth )
sagaMiddleware.run( watchBurgerBuilder )
sagaMiddleware.run( watchOrders )

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>,
  document.getElementById( 'root' ) );

registerServiceWorker();
