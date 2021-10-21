import * as ActionTypes from '../constants/ActionTypes'
import merge from 'lodash/object/merge'
import union from 'lodash/array/union'
import { UPDATE_PATH } from 'redux-simple-router'

const INIT_PATH = '@@router/INIT_PATH'

let ids = []
if (window.post) {
  ids = [window.post.msg_id]
}
const initialState = {
  selectedTab: 'chat',
  init: true,
  isFetching: false,
  isCreate: true,
  isEnd: false,
  postCount: 0,
  ids: ids,
  checkNewId: [],
  newPost: ''
}

export default function posts(state = initialState, action) {
  // [ requestType, successType, failureType ] = types
  const [CreatePostRequestType, CreatePostSuccessType, CreatePostFailureType] = ActionTypes.CREATE_POST;
  const [CheckPostRequestType, CheckPostSuccessType, CheckPostFailureType] = ActionTypes.CHECK_POST;
  const [DeletePostRequestType, DeletePostSuccessType, DeletePostFailureType] = ActionTypes.DELETE_POST;
  const [FetchPostRequestType, FetchPostSuccessType, FetchPostFailureType] = ActionTypes.FETCH_POST;
  const [FetchHistoryPostRequestType, FetchHistoryPostSuccessType, FetchHistoryPostFailureType] = ActionTypes.FETCH_HISTORY_POST;
  const [LikeRequestType, LikeSuccessType, LikeFailureType] = ActionTypes.LIKE_POST;
  const [UnLikeRequestType, UnLikeSuccessType, UnLikeFailureType] = ActionTypes.UNLIKE_POST;
  const [RetweetPostRequestType, RetweetPostSuccessType, RetweetPostFailureType] = ActionTypes.RETWEET_POST
  const [UnRetweetPostRequestType, UnRetweetPostSuccessType, UnRetweetPostFailureType] = ActionTypes.UNRETWEET_POST
  const [FlagPostRequestType, FlagPostSuccessType, FlagPostFailureType] = ActionTypes.FLAG_POST
  const [UnFlagPostRequestType, UnFlagPostSuccessType, UnFlagPostFailureType] = ActionTypes.UNFLAG_POST

  switch (action.type) {
    case CreatePostRequestType:
      return merge({}, state, {
        isCreate: true
      })

    case CreatePostSuccessType:
      return merge({}, state, {
        isCreate: false,
        isFetching: true
      })

    case CreatePostFailureType:
      return merge({}, state, {
        isCreate: false,
        isFetching: false
      })

    case DeletePostRequestType:
      state.ids = state.ids.filter(post =>
        post !== action.data.id
      )
      return state

    case DeletePostSuccessType:
      return merge({}, state, {
        isDelete: false
      })

    case DeletePostFailureType:
      return merge({}, state, {
        isDelete: false
      })

    case FetchPostRequestType:
      return merge({}, state, {
        isFetching: false,
        init: false
      })

    case FetchPostSuccessType:
      if (action.response && action.response.result) {
        var ids = union(action.response.result, state.ids)
        var err

        if(ids.length === 0)
          err = '附近有什麼新鮮事嗎？一起分享給附近的人知道吧 ：）'

        return merge({}, state, {
          isFetching: false,
          fetchError: err || null,
          ids: ids,
          init: false
        })
      } else {
        return merge({}, state, {
          isFetching: false,
          init: false
        })
      }

    case LikeSuccessType:
      return merge({}, state, {
        notification: action.data.notification
      })

    case UnLikeSuccessType:
      return merge({}, state, {
        notification: action.data.notification
      })

    case RetweetPostSuccessType:
      return merge({}, state, {
        notification: action.data.notification
      })

    case UnRetweetPostSuccessType:
      return merge({}, state, {
        notification: action.data.notification
      })

    case FlagPostSuccessType:
      return merge({}, state, {
        notification: action.data.notification
      })

    case UnFlagPostSuccessType:
      return merge({}, state, {
        notification: action.data.notification
      })


    case FetchPostFailureType:
      return merge({}, state, {
        isFetching: false,
        init: false
      })

    case CheckPostSuccessType:
      if (action.response && action.response.result) {
        let filter = action.response.result.filter((id) => {
          if(!action.response.entities.post[id].self.isMe) return id
        })

        return merge({}, state, {
          isFetching: false,
          checkNewId: union(filter, state.checkNewId),
          init: false
        })
      } else {
        return merge({}, state, {
          isFetching: false,
          init: false
        })
      }

    case FetchHistoryPostSuccessType:
      if (action.response && action.response.result) {
        return merge({}, state, {
          ids: union(state.ids, action.response.result)
        })
      } else {
        return state
      }

    case ActionTypes.MERGE_POST:
      var newState = merge({}, state, {
        ids: union(state.checkNewId, state.ids)
      })

      newState.checkNewId = []
      return newState

    case ActionTypes.CLEAR_NOTICE:
      return merge({}, state, {
        notification: null
      })

    case INIT_PATH:
      var tab = action.payload.path.replace('/', '')

      if(tab === '_=_' || !tab) {
        tab = 'chat'
      }

      return merge({}, initialState, {
        selectedTab: tab
      })

    case UPDATE_PATH:
      return merge({}, initialState, {
        selectedTab: action.payload.path.replace('/', '')
      })

    default:
      return state
  }
}
