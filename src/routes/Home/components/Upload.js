/* globals storageUrl */

import React, { Component } from 'react'

class Upload extends Component {
  render () {
    const { user, attachments = [] } = this.props
    const { username } = user
    const [firstAttachment] = attachments

    const imageDivStyle = {}

    if (firstAttachment) {
      imageDivStyle.backgroundImage = 'url(' + storageUrl + '/' + firstAttachment + ')'
    }

    return (
      <div className='upload-container'>
        <div className='upload-image' style={imageDivStyle}>
          <div className='upload-bottom-bar'>{username}</div>
        </div>
      </div>
    )
  }
}

Upload.propTypes = {
  user: React.PropTypes.object.isRequired,
  attachments: React.PropTypes.arrayOf(React.PropTypes.string).isRequired
}

export default Upload
