import * as ActionTypes from '../constants/ActionTypes'

export default function weather(state = {}, action) {

  switch (action.type) {
    case ActionTypes.FETCH_WEATHER[1]:
      if (action.response.result) {
        return Object.assign({}, state, {
          id: action.response.result
        })
      }
    default:
      return state
  }

}
