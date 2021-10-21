import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
//import { reduxReactRouter } from 'redux-simple-router'
import thunk from 'redux-thunk'
import api from '../middleware/api'
import createLogger from 'redux-logger'
import rootReducer from '../reducers'

//import { syncReduxAndRouter, routeReducer } from 'redux-simple-router'
import { reducers } from '../reducers'

/*const reducer = combineReducers(Object.assign({}, reducers, {
  routing: routeReducer
}))*/

const store = createStore(rootReducer)

const finalCreateStore = compose(
  applyMiddleware(thunk, api)
)(createStore)

export default function configureStore(initialState) {
  const store = finalCreateStore(rootReducer, initialState)
  return store
}
