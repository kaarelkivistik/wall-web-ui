import { CALL_API } from 'redux-api-middleware';

export function getUploads() {
	return {
		[CALL_API]: {
			endpoint: "http://localhost",
			method: "GET",
			types: ["GET_UPLOADS_REQUEST", "GET_UPLOADS_SUCCESS", "GET_UPLOADS_FAILURE"]
		}
	}
}

export function addUploadToCollection(upload) {
	return {
		type: "ADD_UPLOAD_TO_COLLECTION",
		upload
	};
}

export function uploads(state = {}, action) {
	switch(action.type) {
		case "GET_UPLOADS_SUCCESS":
			const { payload } = action;
			const newState = {};

			payload.map(upload => {
				upload.timestamp = new Date(upload.timestamp);

				return upload;
			}).forEach(upload => {
				newState[upload._id] = upload
			});

			return newState;

		case "ADD_UPLOAD_TO_COLLECTION":
			const { upload } = action;

			return {
				...state,
				[upload._id]: upload
			};

		default:
			return state;
	}
}
