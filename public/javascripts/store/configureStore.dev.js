import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
//import { reduxReactRouter } from 'redux-simple-router'
import createLogger from 'redux-logger'
import thunk from 'redux-thunk'
//import { syncReduxAndRouter } from 'redux-simple-router'

import DevTools from '../containers/DevTools'
import api from '../middleware/api'
import rootReducer from '../reducers'

// Creates a Redux store that holds the complete state tree of your app.
// There should only be a single store in your app.
// http://redux.js.org/docs/api/createStore.html
const finalCreateStore = compose(
  applyMiddleware(thunk, api),
  applyMiddleware(createLogger()),
  DevTools.instrument()
)(createStore)

export default function configureStore(initialState) {
  const store = finalCreateStore(rootReducer, initialState)

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers')
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
