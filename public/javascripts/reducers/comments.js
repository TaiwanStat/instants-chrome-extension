import * as ActionTypes from '../constants/ActionTypes'
import merge from 'lodash/object/merge'
import union from 'lodash/array/union'

let showComments = []

const initialState = {
  msgIds: {},
  showComments: showComments
}

export default function comments(state = initialState, action) {
  const [FetchCommentRequestType, FetchCommentSuccessType, FetchCommentFailureType] = ActionTypes.FETCH_COMMENT;
  const [CreateCommentRequestType, CreateCommentSuccessType, CreateCommentFailureType] = ActionTypes.CREATE_COMMENT;

  switch (action.type) {
    case FetchCommentSuccessType:
      if (action.response && action.response.result) {
        var stateMsgIds = state.msgIds[action.data.msgId]

        let preId = stateMsgIds? stateMsgIds: []
        var ids = union(action.response.result, preId)
        let newState = {msgIds: {}}
        newState.msgIds[action.data.msgId] = ids

        return merge({}, state, newState)
      }else {
        return state
      }

    case CreateCommentRequestType:
      return merge({}, state, {
        isCreate: true
      })

    case CreateCommentSuccessType:
      return merge({}, state, {
        isCreate: false,
        isFetching: true
      })

    case CreateCommentFailureType:
      return merge({}, state, {
        isCreate: false,
        isFetching: false
      })

    case ActionTypes.SHOW_COMMENT:
      let msgId = action.data.msgId
      var showComments = state.showComments

      if(showComments.indexOf(msgId) === -1) {
        // can't find
        showComments = [msgId]
      }else {
        showComments = showComments.filter(e => e !== msgId)
      }


      return Object.assign({}, state, {
        showComments: showComments
      })

    default:
      return state;
  }
}
