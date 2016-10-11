import React, { Component } from 'react';

class Upload extends Component {
	render() {
		const { user, attachments = [], timestamp } = this.props;
		const { username } = user;
		const [firstAttachment] = attachments;

		const imageDivStyle = {};

		if(firstAttachment)
			imageDivStyle.backgroundImage = "url(" + apiUrl + "/storage/" + firstAttachment + ")";

		return (
			<div className="upload-container">
				<div className="upload-image" style={imageDivStyle}>
					<div className="upload-bottom-bar">{username}</div>
				</div>
			</div>
		);
	}
}

export default Upload;
