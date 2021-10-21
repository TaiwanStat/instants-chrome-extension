//import { routeReducer } from 'redux-simple-router'
import { combineReducers } from 'redux'

// Action constants
import * as ActionTypes from '../constants/ActionTypes'

// reducers
import posts from './posts'
import user from './user'
import alerts from './alerts'
import comments from './comments'
import weatherManager from './weather'
import entities from './entities'
import errorMessage from './error'

// combine reducers
const rootReducer = combineReducers({
  weatherManager,
  posts,
  errorMessage,
  user,
  entities,
  alerts,
  comments,
  //routing: routeReducer
})

export default rootReducer
