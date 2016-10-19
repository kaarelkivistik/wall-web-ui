import { CALL_API } from 'redux-api-middleware'
import {
  FETCH_UPLOADS_REQUEST,
  FETCH_UPLOADS_SUCCESS,
  FETCH_UPLOADS_FAILURE,
  FETCH_UPLOADS_APPEND_SUCCESS,

  APPEND_UPLOADS,

  fetchUploads,
  appendUploads,
  uploadsOrderByDate,

  uploadsReducer
} from 'routes/Home/modules/uploads'

describe('(Internal module) Uploads', () => {
  beforeEach(() => {
    global.apiUrl = 'foobar'
    global.webSocketUrl = 'foobar'
  })

  it('Should export appropriate constants.', () => {
    expect(FETCH_UPLOADS_REQUEST).to.equal('FETCH_UPLOADS_REQUEST')
    expect(FETCH_UPLOADS_SUCCESS).to.equal('FETCH_UPLOADS_SUCCESS')
    expect(FETCH_UPLOADS_APPEND_SUCCESS).to.equal('FETCH_UPLOADS_APPEND_SUCCESS')
    expect(FETCH_UPLOADS_FAILURE).to.equal('FETCH_UPLOADS_FAILURE')

    expect(APPEND_UPLOADS).to.equal('APPEND_UPLOADS')
  })

  describe('(Action creator) fetchUploads', () => {
    it('Should be a function.', () => {
      expect(fetchUploads).to.be.a('function')
    })

    it('Should return an appropriate action.', () => {
      let action = fetchUploads()

      expect(action).to.have.property(CALL_API)

      let apiCall = action[CALL_API]

      expect(apiCall).to.be.an('object')
      expect(apiCall).to.have.property('endpoint').and.equal('foobar/?')
      expect(apiCall).to.have.property('types').and.deep.equal([
        FETCH_UPLOADS_REQUEST,
        FETCH_UPLOADS_SUCCESS,
        FETCH_UPLOADS_FAILURE
      ])
    })

    it('Should return an appropriate action when appending.', () => {
      let action = fetchUploads(new Date(), 1, true)

      expect(action).to.have.property(CALL_API)

      let apiCall = action[CALL_API]

      expect(apiCall).to.be.an('object')
      expect(apiCall).to.have.property('types').and.deep.equal([
        FETCH_UPLOADS_REQUEST,
        FETCH_UPLOADS_APPEND_SUCCESS,
        FETCH_UPLOADS_FAILURE
      ])
    })
  })

  describe('(Action creator) appendUploads', () => {
    it('Should be a function.', () => {
      expect(appendUploads).to.be.a('function')
    })

    it('Should cast arguments to an array.', () => {
      let action = appendUploads('foo', 'bar')

      expect(action).to.have.property('payload')
        .and.to.be.deep.equal(['foo', 'bar'])
    })
  })

  describe('(Selector) uploadsOrderByDate', () => {
    it('Should be a function.', () => {
      expect(uploadsOrderByDate).to.be.a('function')
    })

    it('Should return uploads ordered by date.', () => {
      let state = {
        uploads: {
          'c': {
            timestamp: new Date('2014-10-02T19:01:44.468Z')
          },
          'a': {
            timestamp: new Date('2016-10-02T19:01:44.468Z')
          },
          'b': {
            timestamp: new Date('2015-10-02T19:01:44.468Z')
          }
        }
      }

      let uploads = uploadsOrderByDate(state)

      expect(uploads).to.deep.equal(['a', 'b', 'c'])
    })
  })

  describe('(Uploads reducer)', () => {
    it('Should be a function', () => {
      expect(uploadsReducer).to.be.a('function')
    })

    it('Should be an empty object when initialized.', () => {
      expect(uploadsReducer(undefined, {})).to.be.deep.equal({})
    })

    it('Should preserve and normalize new uploads.', () => {
      let state = uploadsReducer(undefined, {})
      state = uploadsReducer(state, {
        type: FETCH_UPLOADS_SUCCESS,
        payload: [{
          '_id': '57f15998dbe6a9000197347a',
          'user': {
            'name': 'Kaarel Kivistik',
            'username': 'kaarel',
            'id': 18
          },
          'published': true,
          'allowAdditionalAttachments': false,
          'attachments': ['80658c28058f300c2df6fccbfbe56559.png'],
          'timestamp': '2016-10-02T19:01:44.468Z'
        }]
      })

      expect(state).to.have.property('57f15998dbe6a9000197347a')

      let upload = state['57f15998dbe6a9000197347a']

      expect(upload).to.have.property('timestamp').and.to.be.instanceof(Date)
      expect(upload).to.have.property('user').and.to.be.an('object')
      expect(upload).to.have.property('attachments').and.to.be.deep.equal(['80658c28058f300c2df6fccbfbe56559.png'])

      state = uploadsReducer(state, {
        type: FETCH_UPLOADS_APPEND_SUCCESS,
        payload: [{
          '_id': 'nk3njknjk2knj2njk24',
          'user': {
            'name': 'Kaarel Kivistik',
            'username': 'kaarel',
            'id': 18
          },
          'published': true,
          'allowAdditionalAttachments': false,
          'attachments': ['80658c28058f300c2df6fccbfbe56559.png'],
          'timestamp': '2016-10-02T19:01:44.468Z'
        }]
      })

      expect(state).to.have.property('57f15998dbe6a9000197347a')
      expect(state).to.have.property('nk3njknjk2knj2njk24')

      upload = state['nk3njknjk2knj2njk24']

      expect(upload).to.have.property('timestamp').and.to.be.instanceof(Date)
      expect(upload).to.have.property('user').and.to.be.an('object')
      expect(upload).to.have.property('attachments').and.to.be.deep.equal(['80658c28058f300c2df6fccbfbe56559.png'])
    })

    it('Should append new uploads.', () => {
      let state = {
        '57f15998dbe6a9000197347a': {
          '_id': '57f15998dbe6a9000197347a',
          'user': {
            'name': 'Kaarel Kivistik',
            'username': 'kaarel',
            'id': 18
          },
          'published': true,
          'allowAdditionalAttachments': false,
          'attachments': ['80658c28058f300c2df6fccbfbe56559.png'],
          'timestamp': new Date('2016-10-02T19:01:44.468Z')
        }
      }

      state = uploadsReducer(state, {
        type: APPEND_UPLOADS,
        payload: [{
          '_id': '57f15998dbe6a9000197347b',
          'user': {
            'name': 'Kaarel Kivistik',
            'username': 'kaarel',
            'id': 18
          },
          'published': true,
          'allowAdditionalAttachments': false,
          'attachments': ['80658c28058f300c2df6fccbfbe56559.png'],
          'timestamp': '2016-10-02T19:01:44.468Z'
        }]
      })

      expect(state).to.have.property('57f15998dbe6a9000197347a')
      expect(state).to.have.property('57f15998dbe6a9000197347b')

      let upload = state['57f15998dbe6a9000197347b']

      expect(upload).to.have.property('timestamp').and.to.be.instanceof(Date)
    })
  })
})
