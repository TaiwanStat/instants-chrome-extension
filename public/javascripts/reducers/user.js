import * as ActionTypes from '../constants/ActionTypes'

const initialState = {
  position: null,
  id: {}
}

export default function user(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.POSITION_UPDATE:
      return Object.assign({}, state, {
        position: action.position
      })

    case ActionTypes.FETCH_ME[1]:
      return Object.assign({}, state, {
        id: action.response.result
      })

    default:
      return state;
  }
}
