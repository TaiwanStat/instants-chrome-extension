import { Schema, arrayOf, normalize } from 'normalizr'
import { camelizeKeys } from 'humps'
import { API_ROOT } from '../constants'

// Fetches an API response and normalizes the result JSON according to schema.
// This makes every API response have the same shape, regardless of how nested it was.
function callApi(endpoint, opts, schema) {
  const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint

  return fetch(fullUrl, opts)
    .then(response => {
      if (!response.ok) {
        return Promise.reject(json)
      }

      return response.json().then(
        json => {
          return { json, response }
        },
        error => {
          return { null, response }
        }
      )

    }).then(({ json, response }) => {
      if (json) {
        const camelizedJson = camelizeKeys(json)
        return Object.assign({},
          normalize(camelizedJson, schema)
        )
      }

      return response;
    })
}

// We use this Normalizr schemas to transform API responses from a nested form
// to a flat form where repos and users are placed in `entities`, and nested
// JSON objects are replaced with their IDs. This is very convenient for
// consumption by reducers, because we can easily build a normalized tree
// and keep it updated as we fetch more data.
const userSchema = new Schema('user', {
  idAttribute: 'fbId'
})

const postSchema = new Schema('post', {
  idAttribute: 'msgId'
})

const weatherSchema = new Schema('weather', {
})

const alertSchema = new Schema('alert', {
  idAttribute: 'notificationId'
})

const commentSchema = new Schema('comment', {
  idAttribute: 'commentId'
})

export const Schemas = {
  USER: userSchema,
  POST: postSchema,
  POST_ARRAY: arrayOf(postSchema),
  WEATHER: weatherSchema,
  ALERT: alertSchema,
  ALERT_ARRAY: arrayOf(alertSchema),
  COMMENT: commentSchema,
  COMMENT_ARRAY: arrayOf(commentSchema)
}

// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_API = Symbol('Call API')

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default store => next => action => {
  const callAPI = action[CALL_API]
  if (typeof callAPI === 'undefined') {
    return next(action)
  }

  let { endpoint } = callAPI
  let { opts } = callAPI
  const { schema, types, data } = callAPI

  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState())
  }

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.')
  }
  if (!schema) {
    throw new Error('Specify one of the exported Schemas.')
  }
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.')
  }
  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.')
  }

  function actionWith(data) {
    const finalAction = Object.assign({}, action, data)
    delete finalAction[CALL_API]
    return finalAction
  }

  const [ requestType, successType, failureType ] = types
  next(actionWith({ type: requestType, data: data }))

  return callApi(endpoint, opts, schema).then(
    response => next(actionWith({
      response,
      type: successType,
      data: data
    })),
    error => next(actionWith({
      type: failureType,
      data: data,
      error: error.message//'抱歉，目前無法於 Instants 建立連線'
    }))
  )
}
