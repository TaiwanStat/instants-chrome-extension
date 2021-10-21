import { CALL_API, Schemas } from '../middleware/api'
import * as types from '../constants/ActionTypes'

export function updatePosition(position) {
  return (dispatch, getState) => {
    return dispatch({
      type: types.POSITION_UPDATE,
      position: position
    })
  }
}

// Resets the currently visible error message.
export function resetErrorMessage() {
  return (dispatch, getState) => {
    return dispatch({
      type: types.RESET_ERROR_MESSAGE
    })
  }
}

export function fetchMyProfile() {
  return (dispatch, getState) => {
    return dispatch({[CALL_API]: {
      types: types.FETCH_ME,
      endpoint: 'me',
      schema: Schemas.USER,
      opts: {
        credentials: 'include'
      }
    }});
  }
}

export function fetchWeatherData() {
  return (dispatch, getState) => {
    const state = getState()
    const lat = state.user.position.lat
    const lng = state.user.position.lng

    return dispatch({[CALL_API]: {
      types: types.FETCH_WEATHER,
      endpoint: 'weather/read?lat='+lat+'&lng='+lng,
      schema: Schemas.WEATHER
    }});
  }
}
