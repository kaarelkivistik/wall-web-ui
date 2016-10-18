import React from 'react'
import { HomeView } from 'routes/Home/components/HomeView'
import Upload from 'routes/Home/components/Upload'
import { mount, shallow } from 'enzyme'
import { spy, stub } from 'sinon'

describe('(Component) HomeView', () => {
  global.apiUrl = 'foobar'
  global.webSocketUrl = 'foobar'
  global.WebSocket = function () {}

  it('Should append upload received via WebSocket', () => {
    const appendUploadsSpy = spy()

    let wrapper = mount(
      <HomeView
        setToken={stub()}
        fetchUserInfo={stub()}
        fetchUploads={stub()}
        appendUploads={appendUploadsSpy}
        order={[]} />
    )

    spy(wrapper.instance(), 'handleParsedMessage')

    wrapper.instance().onMessage({
      data: JSON.stringify({
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
      })
    })

    expect(appendUploadsSpy.calledOnce).to.be.true
    expect(appendUploadsSpy.args[0]).to.deep.equal([{
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
    }])
  })

  it('Should render using the order provided.', () => {
    let uploads = {
      '57f15998dbe6a9000197347b': {
        '_id': '57f15998dbe6a9000197347b',
        'user': {
          'name': 'Kaarel Kivistik',
          'username': 'kaarel',
          'id': 18
        },
        'published': true,
        'allowAdditionalAttachments': false,
        'attachments': ['80658c28058f300c2df6fccbfbe56559.png'],
        'timestamp': new Date('2016-10-02T19:01:44.468Z')
      },
      '57f15998dbe6a9000197347c': {
        '_id': '57f15998dbe6a9000197347c',
        'user': {
          'name': 'Kaarel Kivistik',
          'username': 'kaarel',
          'id': 18
        },
        'published': true,
        'allowAdditionalAttachments': false,
        'attachments': ['80658c28058f300c2df6fccbfbe56559.png'],
        'timestamp': new Date('2017-10-02T19:01:44.468Z')
      },
      '57f15998dbe6a9000197347d': {
        '_id': '57f15998dbe6a9000197347d',
        'user': {
          'name': 'Kaarel Kivistik',
          'username': 'kaarel',
          'id': 18
        },
        'published': true,
        'allowAdditionalAttachments': false,
        'attachments': ['80658c28058f300c2df6fccbfbe56559.png'],
        'timestamp': new Date('2010-10-02T19:01:44.468Z')
      }
    }

    let order = ['57f15998dbe6a9000197347c', '57f15998dbe6a9000197347b', '57f15998dbe6a9000197347d']

    let wrapper = shallow(
      <HomeView
        setToken={stub()}
        fetchUserInfo={stub()}
        fetchUploads={stub()}
        appendUploads={stub()}
        uploads={uploads}
        order={order} />
    )

    expect(wrapper.find(Upload)).to.have.length(3)
  })
})
