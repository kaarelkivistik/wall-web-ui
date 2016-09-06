import React, { Component } from 'react';
import { connect } from 'react-redux';
import FlipMove from 'react-flip-move';

import { getUploads, addUploadToCollection } from './redux';
import { getUploadOrderByDate } from './selectors';
import Upload from './upload';

class UploadCollection extends Component {
	constructor(props) {
		super(props);

		this.onOpen = this.onOpen.bind(this);
		this.onMessage = this.onMessage.bind(this);
		this.handleParsedMessage = this.handleParsedMessage.bind(this);

		let socket = new WebSocket("ws://localhost");

		socket.onopen = this.onOpen;
		socket.onmessage = this.onMessage;

		this.state = {
			socket
		};
	}

	componentDidMount() {
		const { getUploads } = this.props;

		getUploads();
	}

	componentWillUnmount() {
		this.state.socket.close();
	}

	onOpen() {
		this.setState({
			socketOpen: true
		});
	}

	onMessage(messageEvent) {
		let parsed;

		try {
			parsed = JSON.parse(messageEvent.data);

			this.handleParsedMessage(parsed);
		} catch(e) {
			console.error("Garbled message from WebSocket:", messageEvent);
		}
	}

	handleParsedMessage(message) {
		const { addUploadToCollection } = this.props;

		addUploadToCollection(message);
	}

	render() {
		const { uploads, order } = this.props;



		return (
			<div>
				<div>
					<FlipMove className="row">
						{order.slice(0, 8).map(id => {
							const upload = uploads[id];

							return <Upload key={id} {...upload}/>
						})}
					</FlipMove>
				</div>
			</div>
	 );
	}
}

const mapStateToProps = state => {
	return {
		uploads: state.uploads,
		order: getUploadOrderByDate(state)
	}
};

export default connect(mapStateToProps, {getUploads, addUploadToCollection})(UploadCollection)
