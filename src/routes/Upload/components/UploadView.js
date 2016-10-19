import React, { Component } from 'react'
import DropZone from 'react-dropzone'

import './UploadView.scss'

function readFile (file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = event => {
      resolve(event.target.result)
    }

    reader.readAsDataURL(file)
  })
}

function stripOfDataURL (dataURL) {
  return dataURL.replace(/data:[a-z]+\/?[a-z]+;base64,/, '')
}

class UploadView extends Component {

  constructor () {
    super()

    this.state = {}

    this.onDrop = this.onDrop.bind(this)
    this.publish = this.publish.bind(this)
  }

  onDrop (files) {
    const [file] = files

    if (!file) {
      return
    }

    const { createUpload } = this.props
    const { name } = file

    readFile(file)
      .then(stripOfDataURL)
      .then(result => {
        this.setState({
          published: false,
          filename: name,
          content: result,
          previewUrl: file.preview
        })

        createUpload()
      })
  }

  componentWillReceiveProps (newProps) {
    const { newUpload: { id, attachment, published }, addAttachmentToUpload, newUploadBusy } = newProps
    const { filename, content } = this.state

    if (newUploadBusy) {
      return
    }

    if (id && !attachment) {
      addAttachmentToUpload(id, filename, content)
    } else if (!id && !published) {
      this.setState({
        filename: undefined,
        content: undefined,
        published: undefined,
        previewUrl: undefined
      })
    }
  }

  publish () {
    const { newUpload: { id, attachment }, newUploadBusy, publishUpload } = this.props

    if (!newUploadBusy && id && attachment) {
      publishUpload(id)
    }
  }

  render () {
    const { user, newUpload: { id, attachment, published }, newUploadBusy, resetNewUpload } = this.props
    const { filename, previewUrl } = this.state

    if (!user) {
      return (
        <div className='drop-zone-container' style={{ cursor: 'auto' }}>
          <span className='center'>You should log in first, stranger</span>
        </div>
      )
    }

    return (
      <div className='drop-zone-container' style={{ backgroundImage: 'url(' + previewUrl + ')' }}>
        {filename
          ? <div className='publish-overlay'>
            <span className='center'>
              {published
                ? <span>
                  Wooho, it's online!
                  <small><button onClick={resetNewUpload}>Another one</button></small>
                </span>
                : <span>
                  <button disabled={newUploadBusy || !id || !attachment} onClick={this.publish}>Publish</button><br />
                  <small><button onClick={resetNewUpload}>Discard</button></small>
                </span>}
            </span>
          </div>
          : <DropZone style={{}} multiple={false} onDrop={this.onDrop}>
            <span className='center'>Drag JPG, PNG or a GIF here</span>
          </DropZone>}
      </div>
    )
  }
}

UploadView.propTypes = {
  user: React.PropTypes.object,
  createUpload: React.PropTypes.func.isRequired,
  addAttachmentToUpload: React.PropTypes.func.isRequired,
  publishUpload: React.PropTypes.func.isRequired,
  resetNewUpload: React.PropTypes.func.isRequired,
  newUpload: React.PropTypes.object.isRequired,
  newUploadBusy: React.PropTypes.bool
}

export default UploadView
