import React, { Component } from 'react';

const bottomBoxStyle = {
    position: "absolute",
    bottom: "0",
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.46)",
    padding: "10px",
    boxSizing: "border-box",
    color: "#DDD",
    fontFamily: "Helvetica",
    fontWeight: "100",
	fontSize: 10
};

class Upload extends Component {
	render() {
		const { subject, from, attachments = [] } = this.props;
		const [firstAttachment] = attachments;
		const [sender] = from;

		return (
			<div className="col-md-3" style={{height: "25vw", padding: 5}}>
				<div style={{backgroundColor: "#DDD", height: "100%", 
					backgroundImage: "url(" + API_URL + "/storage/" + firstAttachment + ")",
					backgroundSize: "cover",
					backgroundPosition: "center center",
					position: "relative"}}>

					<div style={bottomBoxStyle}>{sender.address}</div>
				</div>
			</div>
		);
	}
}

export default Upload;
