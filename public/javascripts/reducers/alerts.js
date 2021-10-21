import * as ActionTypes from '../constants/ActionTypes'
import merge from 'lodash/object/merge'
import union from 'lodash/array/union'

const initialState = {
  ids: []
}

export default function alerts(state = initialState, action) {
  const [FetchAlertRequestType, FetchAlertSuccessType, FetchAlertFailureType] = ActionTypes.FETCH_ALERT;
  const [FetchHistoryAlertRequestType, FetchHistoryAlertSuccessType, FetchHistoryAlertFailureType] = ActionTypes.FETCH_HISTORY_ALERT;
  const [ReadAlertRequestType, ReadAlertSuccessType, ReadAlertFailureType] = ActionTypes.READ_ALERT;
  const [CheckAlertRequestType, CheckAlertSuccessType, CheckAlertFailureType] = ActionTypes.CHECK_ALERT;

  switch (action.type) {
    case FetchAlertSuccessType:
      if (action.response && action.response.result) {
        var ids = union(action.response.result, state.ids)
        return merge({}, state, {
          ids: ids
        })
      }else {
        return state
      }

    case FetchHistoryAlertSuccessType:
      if (action.response && action.response.result) {
        var ids = union(state.ids, action.response.result)
        return merge({}, state, {
          ids: ids
        })
      }else {
        return state
      }

    case CheckAlertSuccessType:
      if (action.response && action.response.result) {
        var ids = union(action.response.result, state.ids)
        return merge({}, state, {
          ids: ids
        })
      }else {
        return state
      }

    default:
      return state;
  }
}
