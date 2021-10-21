import { CALL_API, Schemas } from '../middleware/api'
import * as types from '../constants/ActionTypes'


export function fetchPosts(tag) {
  return (dispatch, getState) => {
    const state = getState()
    if (!state.user.position)
      return
    const lat = state.user.position.lat
    const lng = state.user.position.lng

    return dispatch({[CALL_API]: {
      types: types.FETCH_POST,
      endpoint: 'chat/read/?lat='+lat+'&lng='+lng+'&tag='+tag+'&total='+10,
      schema: Schemas.POST_ARRAY,
      opts: {
        credentials: 'include'
      }
    }});
  }
}

export function checkPosts(tag, stamp) {
  return (dispatch, getState) => {
    const state = getState()
    const lat = state.user.position.lat
    const lng = state.user.position.lng

    return dispatch({[CALL_API]: {
      types: types.CHECK_POST,
      endpoint: 'chat/read/?lat='+lat+'&lng='+lng+'&tag='+tag+'&start='+stamp+'&end='+(new Date()).getTime(),
      schema: Schemas.POST_ARRAY,
      opts: {
        credentials: 'include'
      }
    }});
  }
}

export function mergeNewPosts() {
  return (dispatch, getState) => {
    return dispatch({
      type: types.MERGE_POST
    });
  }
}

export function fetchHistoryPost(tag, end) {
  return (dispatch, getState) => {
    const state = getState()
    const lat = state.user.position.lat
    const lng = state.user.position.lng

    return dispatch({[CALL_API]: {
      types: types.FETCH_HISTORY_POST,
      endpoint: 'chat/read/?lat='+lat+'&lng='+lng+'&tag='+tag+'&end='+end+'&total='+10,
      schema: Schemas.POST_ARRAY,
      opts: {
        credentials: 'include'
      }
    }});
  }
}


export function createPost(text, photo, tags) {
  return (dispatch, getState) => {
    const state = getState()
    const lat = state.user.position.lat
    const lng = state.user.position.lng

    let data = new FormData()
    data.append('content', text)
    data.append('tags', tags)
    data.append('lat', lat)
    data.append('lng', lng)
    data.append('photo', photo)

    return dispatch({[CALL_API]: {
      types: types.CREATE_POST,
      endpoint: 'chat/create/',
      opts: {
        credentials: 'include',
        method: 'POST',
        body: data
      },
      schema: Schemas.POST
    }});
  }
}

export function likePost(id, fbId) {
  return (dispatch, getState) => {
    return dispatch({[CALL_API]: {
      types: types.LIKE_POST,
      endpoint: 'chat/like/?msg_id=' + id,
      opts: {
        credentials: 'include'
      },
      schema: Schemas.POST,
      data: {
        id: id,
        fbId: fbId,
        notification: '你喜歡了這則貼文'
      }
    }});
  }
}

export function unLikePost(id, fbId) {
  return (dispatch, getState) => {
    return dispatch({[CALL_API]: {
      types: types.UNLIKE_POST,
      endpoint: 'chat/unlike/?msg_id=' + id,
      opts: {
        credentials: 'include'
      },
      schema: Schemas.POST,
      data: {
        id: id,
        fbId: fbId,
        notification: '你取消喜歡了這則貼文'
      }
    }});
  }
}

export function retweetPost(id, fbId) {
  return (dispatch, getState) => {
    const state = getState()
    const lat = state.user.position.lat
    const lng = state.user.position.lng

    return dispatch({[CALL_API]: {
      types: types.RETWEET_POST,
      endpoint: 'chat/retweet/?msg_id='+id+'&lng='+lng+'&lat='+lat,
      opts: {
        credentials: 'include'
      },
      schema: Schemas.POST,
      data: {
        id: id,
        fbId: fbId,
        notification: '你轉貼了這則貼文'
      }
    }});
  }
}

export function unRetweetPost(id, fbId) {
  return (dispatch, getState) => {
    return dispatch({[CALL_API]: {
      types: types.UNRETWEET_POST,
      endpoint: 'chat/unretweet/?msg_id='+id,
      opts: {
        credentials: 'include'
      },
      schema: Schemas.POST,
      data: {
        id: id,
        fbId: fbId,
        notification: '你取消轉貼了這則貼文'
      }
    }});
  }
}

export function deletePost(id) {
  return (dispatch, getState) => {
    return dispatch({[CALL_API]: {
      types: types.DELETE_POST,
      endpoint: 'chat/delete/?msg_id=' + id,
      opts: {
        credentials: 'include'
      },
      schema: Schemas.POST,
      data: {
        id: id
      }
    }});
  }
}

export function flagPost(id, text) {
  return (dispatch, getState) => {

    let data = new FormData()
    data.append('msg_id', id)
    data.append('reason', text)

    return dispatch({[CALL_API]: {
      types: types.FLAG_POST,
      endpoint: 'chat/prosecute/',
      opts: {
        credentials: 'include',
        method: 'POST',
        body: data
      },
      schema: Schemas.POST,
      data: {
        id: id,
        notification: '你檢舉了這則貼文'
      }
    }});
  }
}

export function unFlagPost(id) {
  return (dispatch, getState) => {
    return dispatch({[CALL_API]: {
      types: types.UNFLAG_POST,
      endpoint: 'chat/unprosecute/?msg_id='+id,
      opts: {
        credentials: 'include'
      },
      schema: Schemas.POST,
      data: {
        id: id,
        notification: '你取消檢舉了這則貼文'
      }
    }});
  }
}

export function clearNotification() {
  return (dispatch, getState) => {
    return dispatch({
      type: types.CLEAR_NOTICE
    });
  }
}
