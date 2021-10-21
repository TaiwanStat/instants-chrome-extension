import * as ActionTypes from '../constants/ActionTypes'
import merge from 'lodash/object/merge'
import { camelizeKeys } from 'humps'

let post = {}

// what is this??
if (window.post) {
  window.post.distance = -1
  post[window.post.msg_id]  = camelizeKeys(window.post)
}

const initEntities = {
  user: {},
  post: post,
  weather: {},
  alert: {},
  comments: {}
}

// Updates an entity cache in response to any action with response.entities.
export default function entities(state = initEntities, action) {
  if (action.response) {

    const [LikeRequestType, LikeSuccessType, LikeFailureType] = ActionTypes.LIKE_POST
    const [UnLikeRequestType, UnLikeSuccessType, UnLikeFailureType] = ActionTypes.UNLIKE_POST
    const [FlagPostRequestType, FlagPostSuccessType, FlagPostFailureType] = ActionTypes.FLAG_POST
    const [UnFlagPostRequestType, UnFlagPostSuccessType, UnFlagPostFailureType] = ActionTypes.UNFLAG_POST
    const [RetweetPostRequestType, RetweetPostSuccessType, RetweetPostFailureType] = ActionTypes.RETWEET_POST
    const [UnRetweetPostRequestType, UnRetweetPostSuccessType, UnRetweetPostFailureType] = ActionTypes.UNRETWEET_POST
    const [ReadAlertRequestType, ReadAlertSuccessType, ReadAlertFailureType] = ActionTypes.READ_ALERT;
    const data = action.data;

    switch (action.type) {
      case LikeSuccessType:
        var likeCount = state.post[data.id].likeCount;
        state.post[data.id].likeCount = likeCount + 1
        state.post[data.id].self.isLiked = true

        return merge({}, state, action.response.entities)

      case UnLikeSuccessType:
        var likeCount = state.post[data.id].likeCount;
        state.post[data.id].likeCount = likeCount - 1
        state.post[data.id].self.isLiked = false

        return merge({}, state, action.response.entities)

      case RetweetPostSuccessType:
        var retweetCount = state.post[data.id].retweetCount;
        state.post[data.id].retweetCount = retweetCount + 1
        state.post[data.id].self.isRetweeted = true

        return merge({}, state, action.response.entities)

      case UnRetweetPostSuccessType:
        var retweetCount = state.post[data.id].retweetCount;
        state.post[data.id].retweetCount = retweetCount - 1
        state.post[data.id].self.isRetweeted = false

        return merge({}, state, action.response.entities)

      case FlagPostSuccessType:
        state.post[data.id].self.isProsecuted = true

        return merge({}, state, action.response.entities)

      case UnFlagPostSuccessType:
        state.post[data.id].self.isProsecuted = false

        return merge({}, state, action.response.entities)

      case ReadAlertSuccessType:
        //state.alert[data.id].isRead = true

        return merge({}, state, action.response.entities)

      default:
        return merge({}, state, action.response.entities)
    }

  }

  return state
}
