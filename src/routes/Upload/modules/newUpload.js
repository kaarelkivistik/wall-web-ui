/* globals apiUrl */

import { CALL_API } from 'redux-api-middleware'
import { createSelector } from 'reselect'

export const CREATE_UPLOAD_REQUEST = 'CREATE_UPLOAD_REQUEST'
export const CREATE_UPLOAD_SUCCESS = 'CREATE_UPLOAD_SUCCESS'
export const CREATE_UPLOAD_FAILURE = 'CREATE_UPLOAD_FAILURE'

export const ADD_ATTACHMENT_REQUEST = 'ADD_ATTACHMENT_REQUEST'
export const ADD_ATTACHMENT_SUCCESS = 'ADD_ATTACHMENT_SUCCESS'
export const ADD_ATTACHMENT_FAILURE = 'ADD_ATTACHMENT_FAILURE'

export const PUBLISH_UPLOAD_REQUEST = 'PUBLISH_UPLOAD_REQUEST'
export const PUBLISH_UPLOAD_SUCCESS = 'PUBLISH_UPLOAD_SUCCESS'
export const PUBLISH_UPLOAD_FAILURE = 'PUBLISH_UPLOAD_FAILURE'

export const RESET_NEW_UPLOAD = 'RESET_NEW_UPLOAD'

export function createUpload () {
  return {
    [CALL_API]: {
      endpoint: apiUrl + '/',
      method: 'POST',
      types: [CREATE_UPLOAD_REQUEST, CREATE_UPLOAD_SUCCESS, CREATE_UPLOAD_FAILURE],
      headers: state => {
        return {
          'authorization': 'Bearer ' + state.token
        }
      },
      bailout: state => {
        const { token } = state
        return token == null
      }
    }
  }
}

export function addAttachmentToUpload (uploadId, filename, content) {
  return {
    [CALL_API]: {
      endpoint: apiUrl + '/uploads/' + uploadId + '/attachment',
      method: 'POST',
      body: JSON.stringify({
        filename, content
      }),
      types: [ADD_ATTACHMENT_REQUEST, ADD_ATTACHMENT_SUCCESS, ADD_ATTACHMENT_FAILURE],
      headers: state => {
        return {
          'authorization': 'Bearer ' + state.token,
          'content-type': 'application/json'
        }
      },
      bailout: state => {
        const { token } = state
        return token == null
      }
    }
  }
}

export function publishUpload (uploadId) {
  return {
    [CALL_API]: {
      endpoint: apiUrl + '/uploads/' + uploadId,
      method: 'PATCH',
      body: JSON.stringify({
        published: true
      }),
      types: [PUBLISH_UPLOAD_REQUEST, PUBLISH_UPLOAD_SUCCESS, PUBLISH_UPLOAD_FAILURE],
      headers: state => {
        return {
          'authorization': 'Bearer ' + state.token,
          'content-type': 'application/json'
        }
      },
      bailout: state => {
        const { token } = state
        return token == null
      }
    }
  }
}

export function resetNewUpload () {
  return {
    type: RESET_NEW_UPLOAD
  }
}

const newUploadInitialState = {}
export function newUploadReducer (state = newUploadInitialState, action) {
  switch (action.type) {
    case CREATE_UPLOAD_REQUEST:
      return {
        ...state,
        createUploadPending: true
      }
    case CREATE_UPLOAD_SUCCESS:
      return {
        createUploadPending: undefined,
        id: action.payload.id
      }
    case CREATE_UPLOAD_FAILURE:
      return {
        ...newUploadInitialState,
        createUploadError: action.payload.response || true
      }

    case ADD_ATTACHMENT_REQUEST:
      return {
        ...state,
        addAttachmentPending: true
      }
    case ADD_ATTACHMENT_SUCCESS:
      return {
        ...state,
        addAttachmentPending: undefined,
        attachment: true
      }
    case ADD_ATTACHMENT_FAILURE:
      return {
        ...state,
        addAttachmentPending: undefined,
        addAttachmentError: action.payload.response || true,
        attachment: false
      }

    case PUBLISH_UPLOAD_REQUEST:
      return {
        ...state,
        publishUploadPending: true
      }
    case PUBLISH_UPLOAD_SUCCESS:
      return {
        published: state.id
      }
    case PUBLISH_UPLOAD_FAILURE:
      return {
        ...newUploadInitialState,
        publishUploadError: action.payload.response || true
      }

    case RESET_NEW_UPLOAD:
      return newUploadInitialState

    default:
      return state
  }
}

const getNewUploadState = state => state.newUpload

export const getIsNewUploadBusy = createSelector(
  [getNewUploadState],
  (newUpload) => {
    return newUpload.createUploadError ||
      newUpload.addAttachmentError ||
      newUpload.publishUploadError ||
      newUpload.createUploadPending ||
      newUpload.addAttachmentPending ||
      newUpload.publishUploadPending
  }
)
