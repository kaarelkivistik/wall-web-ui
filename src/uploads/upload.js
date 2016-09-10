import React, { Component } from 'react';

class Upload extends Component {
	render() {
		const { subject, from, attachments = [], timestamp } = this.props;
		const [firstAttachment] = attachments;
		const [sender] = from;

		const imageDivStyle = {};

		if(firstAttachment)
			imageDivStyle.backgroundImage = "url(" + API_URL + "/storage/" + firstAttachment + ")";

		return (
			<div className="col-sm-6 col-md-4 col-lg-3 square upload-container">
				<div className="upload-image" style={imageDivStyle}>
					<div className="upload-bottom-bar">{sender.address}</div>
				</div>
			</div>
		);
	}
}

export default Upload;
