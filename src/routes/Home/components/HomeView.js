/* globals webSocketUrl */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import FlipMove from 'react-flip-move'
import './HomeView.scss'

import { fetchUploads, appendUploads, uploadsOrderByDate } from '../modules/uploads'
import Upload from './Upload'

const BATCH_SIZE = 12

export class HomeView extends Component {

  constructor (props) {
    super(props)

    this.onOpen = this.onOpen.bind(this)
    this.onMessage = this.onMessage.bind(this)
    this.handleParsedMessage = this.handleParsedMessage.bind(this)
    this.loadMore = this.loadMore.bind(this)

    let socket = new WebSocket(webSocketUrl)

    socket.onopen = this.onOpen
    socket.onmessage = this.onMessage

    this.state = {
      socket
    }
  }

  componentDidMount () {
    const { fetchUploads } = this.props

    fetchUploads(undefined, BATCH_SIZE)
  }

  componentWillUnmount () {
    this.state.socket.close()
  }

  onOpen () {
    this.setState({
      socketOpen: true
    })
  }

  onMessage (messageEvent) {
    try {
      this.handleParsedMessage(JSON.parse(messageEvent.data))
    } catch (e) {
      console.error('Unable to parse, error:', e)
    }
  }

  handleParsedMessage (upload) {
    const { appendUploads } = this.props

    appendUploads(upload)
  }

  loadMore () {
    const { fetchUploads, uploads, order } = this.props

    if (order.length === 0) {
      return
    }

    const last = uploads[order[order.length - 1]]

    fetchUploads(last.timestamp, BATCH_SIZE, true)
  }

  render () {
    const { uploads, order } = this.props

    return (
      <div className='upload-collection'>
        <FlipMove>
          {order.map(id => {
            const upload = uploads[id]

            return <Upload key={id} {...upload} />
          })}
          <div style={{ clear: 'both' }} />
        </FlipMove>

        <div className='load-more-container'>
          <button className='load-more-button' onClick={this.loadMore}>Load more</button>
        </div>
      </div>
   )
  }
}

HomeView.propTypes = {
  fetchUploads: React.PropTypes.func.isRequired,
  appendUploads: React.PropTypes.func.isRequired,
  uploads: React.PropTypes.object.isRequired,
  order: React.PropTypes.arrayOf(React.PropTypes.string).isRequired
}

const mapStateToProps = state => {
  return {
    uploads: state.uploads,
    order: uploadsOrderByDate(state)
  }
}

const mapActionsToProps = {
  fetchUploads,
  appendUploads
}

export default connect(mapStateToProps, mapActionsToProps)(HomeView)
