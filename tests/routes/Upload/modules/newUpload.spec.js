import { CALL_API } from 'redux-api-middleware'
import {
  CREATE_UPLOAD_REQUEST,
  CREATE_UPLOAD_SUCCESS,
  CREATE_UPLOAD_FAILURE,

  ADD_ATTACHMENT_REQUEST,
  ADD_ATTACHMENT_SUCCESS,
  ADD_ATTACHMENT_FAILURE,

  PUBLISH_UPLOAD_REQUEST,
  PUBLISH_UPLOAD_SUCCESS,
  PUBLISH_UPLOAD_FAILURE,

  RESET_NEW_UPLOAD,

  createUpload,
  addAttachmentToUpload,
  publishUpload,

  resetNewUpload,

  newUploadReducer
} from 'routes/Upload/modules/newUpload'

describe('(Internal module) NewUpload', () => {
  beforeEach(() => {
    global.apiUrl = 'foobar'
    global.webSocketUrl = 'foobar'
  })

  it('Should export appropriate constants.', () => {
    expect(CREATE_UPLOAD_REQUEST).to.equal('CREATE_UPLOAD_REQUEST')
    expect(CREATE_UPLOAD_SUCCESS).to.equal('CREATE_UPLOAD_SUCCESS')
    expect(CREATE_UPLOAD_FAILURE).to.equal('CREATE_UPLOAD_FAILURE')

    expect(ADD_ATTACHMENT_REQUEST).to.equal('ADD_ATTACHMENT_REQUEST')
    expect(ADD_ATTACHMENT_SUCCESS).to.equal('ADD_ATTACHMENT_SUCCESS')
    expect(ADD_ATTACHMENT_FAILURE).to.equal('ADD_ATTACHMENT_FAILURE')

    expect(PUBLISH_UPLOAD_REQUEST).to.equal('PUBLISH_UPLOAD_REQUEST')
    expect(PUBLISH_UPLOAD_SUCCESS).to.equal('PUBLISH_UPLOAD_SUCCESS')
    expect(PUBLISH_UPLOAD_FAILURE).to.equal('PUBLISH_UPLOAD_FAILURE')

    expect(RESET_NEW_UPLOAD).to.equal('RESET_NEW_UPLOAD')
  })

  describe('(Action creator) createUpload', () => {
    it('Should be a function.', () => {
      expect(createUpload).to.be.a('function')
    })

    it('Should return an appropriate action.', () => {
      let action = createUpload()

      expect(action).to.have.property(CALL_API)

      let apiCall = action[CALL_API]

      expect(apiCall).to.be.an('object')
      expect(apiCall).to.have.property('method').and.equal('POST')
      expect(apiCall).to.have.property('endpoint').and.equal('foobar')

      expect(apiCall).to.have.property('types').and.deep.equal([
        CREATE_UPLOAD_REQUEST,
        CREATE_UPLOAD_SUCCESS,
        CREATE_UPLOAD_FAILURE
      ])

      expect(apiCall).to.have.deep.property('headers').and.to.be.a('function')

      let headers = apiCall.headers({
        token: '3n2nj342k432'
      })

      expect(headers).to.have.property('authorization', 'Bearer 3n2nj342k432')
    })
  })

  describe('(Action creator) addAttachmentToUpload', () => {
    it('Should be a function.', () => {
      expect(addAttachmentToUpload).to.be.a('function')
    })

    it('Should return an appropriate action.', () => {
      let action = addAttachmentToUpload('uploadId', 'filename', 'content')

      expect(action).to.have.property(CALL_API)

      let apiCall = action[CALL_API]

      expect(apiCall).to.be.an('object')
      expect(apiCall).to.have.property('method').and.equal('POST')
      expect(apiCall).to.have.property('endpoint').and.equal('foobar/uploads/uploadId/attachment')

      expect(apiCall).to.have.property('body').and.equal(JSON.stringify({
        filename: 'filename',
        content: 'content'
      }))

      expect(apiCall).to.have.property('types').and.deep.equal([
        ADD_ATTACHMENT_REQUEST,
        ADD_ATTACHMENT_SUCCESS,
        ADD_ATTACHMENT_FAILURE
      ])

      expect(apiCall).to.have.deep.property('headers').and.to.be.a('function')

      let headers = apiCall.headers({
        token: '3n2nj342k432'
      })

      expect(headers).to.have.property('authorization', 'Bearer 3n2nj342k432')
      expect(headers).to.have.property('content-type', 'application/json')
    })
  })

  describe('(Action creator) publishUpload', () => {
    it('Should be a function.', () => {
      expect(publishUpload).to.be.a('function')
    })

    it('Should return an appropriate action.', () => {
      let action = publishUpload('uploadId')

      expect(action).to.have.property(CALL_API)

      let apiCall = action[CALL_API]

      expect(apiCall).to.be.an('object')
      expect(apiCall).to.have.property('method').and.equal('PATCH')
      expect(apiCall).to.have.property('endpoint').and.equal('foobar/uploads/uploadId')

      expect(apiCall).to.have.property('body').and.equal(JSON.stringify({
        published: true
      }))

      expect(apiCall).to.have.property('types').and.deep.equal([
        PUBLISH_UPLOAD_REQUEST,
        PUBLISH_UPLOAD_SUCCESS,
        PUBLISH_UPLOAD_FAILURE
      ])

      expect(apiCall).to.have.deep.property('headers').and.to.be.a('function')

      let headers = apiCall.headers({
        token: '3n2nj342k432'
      })

      expect(headers).to.have.property('authorization', 'Bearer 3n2nj342k432')
      expect(headers).to.have.property('content-type', 'application/json')
    })
  })

  describe('(Action creator) resetNewUpload', () => {
    it('Should be a function.', () => {
      expect(resetNewUpload).to.be.a('function')
    })
  })

  describe('(New upload state reducer)', () => {
    it('Should be a function.', () => {
      expect(newUploadReducer).to.be.a('function')
    })

    it('Should be an empty object when initialized.', () => {
      expect(newUploadReducer(undefined, {})).to.deep.equal({})
    })

    it('Should preserve new upload id and remove it when appropriate.', () => {
      let state = newUploadReducer(undefined, {
        type: CREATE_UPLOAD_SUCCESS,
        payload: {
          id: 'newUploadId'
        }
      })

      expect(state).to.have.property('id').and.to.equal('newUploadId')

      state = newUploadReducer(state, {
        type: CREATE_UPLOAD_FAILURE,
        payload: {
          response: {
            message: 'foo',
            code: 0
          }
        }
      })

      expect(state).to.not.have.property('id')
    })

    it('Should indicate added attachment.', () => {
      let state = newUploadReducer(undefined, {
        type: CREATE_UPLOAD_SUCCESS,
        payload: {
          id: 'newUploadId'
        }
      })

      expect(state).to.have.property('id').and.to.equal('newUploadId')

      state = newUploadReducer(state, {
        type: ADD_ATTACHMENT_SUCCESS
      })

      expect(state).to.have.property('attachment').and.to.be.true

      state = newUploadReducer(state, {
        type: ADD_ATTACHMENT_FAILURE,
        payload: {
          response: {
            message: 'foo',
            code: 0
          }
        }
      })

      expect(state).to.have.property('attachment').and.to.be.false
    })

    it('Should indicate ongoing requests.', () => {
      let state = newUploadReducer(state, {
        type: CREATE_UPLOAD_REQUEST
      })

      state = newUploadReducer(state, {
        type: ADD_ATTACHMENT_REQUEST
      })

      state = newUploadReducer(state, {
        type: PUBLISH_UPLOAD_REQUEST
      })

      expect(state).to.have.property('createUploadPending', true)
      expect(state).to.have.property('addAttachmentPending', true)
      expect(state).to.have.property('publishUploadPending', true)

      state = newUploadReducer(state, {
        type: CREATE_UPLOAD_SUCCESS,
        payload: {
          id: 'foobar'
        }
      })

      state = newUploadReducer(state, {
        type: ADD_ATTACHMENT_SUCCESS
      })

      state = newUploadReducer(state, {
        type: PUBLISH_UPLOAD_SUCCESS
      })

      expect(state.createUploadPending, 'createUploadPending').to.not.exist
      expect(state.addAttachmentPending, 'addAttachmentPending').to.not.exist
      expect(state.publishUploadPending, 'publishUploadPending').to.not.exist
      expect(state.createUploadError, 'createUploadError').to.not.exist
      expect(state.addAttachmentError, 'addAttachmentError').to.not.exist
      expect(state.publishUploadError, 'publishUploadError').to.not.exist

      state = newUploadReducer(state, {
        type: CREATE_UPLOAD_REQUEST
      })

      state = newUploadReducer(state, {
        type: CREATE_UPLOAD_FAILURE,
        payload: {
          response: {
            message: 'foo',
            code: 0
          }
        }
      })

      expect(state.createUploadPending, 'createUploadPending').to.not.exist
      expect(state).to.have.property('createUploadError').and.to.exist

      state = newUploadReducer(state, {
        type: ADD_ATTACHMENT_REQUEST
      })

      state = newUploadReducer(state, {
        type: ADD_ATTACHMENT_FAILURE,
        payload: {
          response: {
            message: 'foo',
            code: 0
          }
        }
      })
      expect(state.addAttachmentPending, 'addAttachmentPending').to.not.exist
      expect(state).to.have.property('addAttachmentError').and.to.exist

      state = newUploadReducer(state, {
        type: PUBLISH_UPLOAD_REQUEST
      })

      state = newUploadReducer(state, {
        type: PUBLISH_UPLOAD_FAILURE,
        payload: {
          response: {
            message: 'foo',
            code: 0
          }
        }
      })

      expect(state.publishUploadPending, 'publishUploadPending').to.not.exist
      expect(state).to.have.property('publishUploadError').and.to.exist
    })

    it('Should indicate successfully published upload.', () => {
      let state = {
        id: 'jnk3kjn23n42'
      }

      state = newUploadReducer(state, {
        type: PUBLISH_UPLOAD_SUCCESS
      })

      expect(state).to.deep.equal({
        published: 'jnk3kjn23n42'
      })
    })

    it('Should reset state.', () => {
      let state = {
        id: 'foobar',
        attachment: true
      }

      state = newUploadReducer(state, resetNewUpload())

      expect(state).to.deep.equal({})
    })
  })
})
