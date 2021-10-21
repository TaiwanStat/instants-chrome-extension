import { CALL_API, Schemas } from '../middleware/api'
import * as types from '../constants/ActionTypes'

export function fetchAlerts() {
  return (dispatch, getState) => {

    return dispatch({[CALL_API]: {
      types: types.FETCH_ALERT,
      endpoint: 'chat/notification/?total='+10,
      schema: Schemas.ALERT_ARRAY,
      opts: {
        credentials: 'include'
      }
    }});
  }
}

export function checkAlerts(stamp) {
  return (dispatch, getState) => {

    return dispatch({[CALL_API]: {
      types: types.CHECK_ALERT,
      endpoint: 'chat/notification/?start='+stamp+'&end='+(new Date()).getTime(),
      schema: Schemas.ALERT_ARRAY,
      opts: {
        credentials: 'include'
      }
    }});
  }
}

export function readAlerts(id) {
  return (dispatch, getState) => {

    return dispatch({[CALL_API]: {
      types: types.READ_ALERT,
      endpoint: 'chat/notification/read/',
      schema: Schemas.ALERT_ARRAY,
      opts: {
        credentials: 'include'
      },
      data: {
        id: id
      }
    }});
  }
}

export function fetchHistoryAlerts(stamp) {
  return (dispatch, getState) => {

    return dispatch({[CALL_API]: {
      types: types.FETCH_HISTORY_ALERT,
      endpoint: 'chat/notification/?end='+stamp+'&total='+3,
      schema: Schemas.ALERT_ARRAY,
      opts: {
        credentials: 'include'
      }
    }});
  }
}


