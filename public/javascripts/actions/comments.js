import { CALL_API, Schemas } from '../middleware/api'
import * as types from '../constants/ActionTypes'

export function fetchComments(msgId) {

  return (dispatch, getState) => {

    return dispatch({[CALL_API]: {
      types: types.FETCH_COMMENT,
      endpoint: 'chat/comment/read/?msg_id='+msgId,
      schema: Schemas.COMMENT_ARRAY,
      opts: {
        credentials: 'include'
      },
      data: {
        msgId: msgId
      }
    }});
  }
}

export function createComment(msgId, text) {

  return (dispatch, getState) => {

    let data = new FormData();
    data.append('content', text)
    data.append('msg_id', msgId)

    return dispatch({[CALL_API]: {
      types: types.CREATE_COMMENT,
      endpoint: 'chat/comment/',
      schema: Schemas.COMMENT,
      opts: {
        credentials: 'include',
        method: 'POST',
        body: data
      }
    }});
  }
}

export function deleteComment(cmtId) {

  return (dispatch, getState) => {
    return dispatch({[CALL_API]: {
      types: types.DELETE_COMMENT,
      endpoint: 'chat/uncomment/?comment_id='+cmtId,
      schema: Schemas.COMMENT,
      opts: {
        credentials: 'include'
      }
    }});
  }
}

export function showComments(msgId) {

  return (dispatch, getState) => {
    return dispatch({
      type: types.SHOW_COMMENT,
      data: {
        msgId: msgId
      }
    });
  }
}
