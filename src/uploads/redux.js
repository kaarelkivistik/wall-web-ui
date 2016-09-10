import { CALL_API } from 'redux-api-middleware';
import qs from 'qs';

export function getUploads(startingFrom, limit, append) {
	const query = {};

	if(startingFrom)
		query.startingFrom = startingFrom;

	if(limit)
		query.limit = limit;

	return {
		[CALL_API]: {
			endpoint: API_URL + "?" + qs.stringify(query),
			method: "GET",
			types: ["GET_UPLOADS_REQUEST", "GET_UPLOADS_SUCCESS" + (append ? "_APPEND" : ""), "GET_UPLOADS_FAILURE"]
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
	const { payload } = action;
	const newState = {};

	switch(action.type) {
		case "GET_UPLOADS_SUCCESS":
			payload.map(upload => {
				upload.timestamp = new Date(upload.timestamp);

				return upload;
			}).forEach(upload => {
				newState[upload._id] = upload
			});

			return newState;

		case "GET_UPLOADS_SUCCESS_APPEND":
			payload.map(upload => {
				upload.timestamp = new Date(upload.timestamp);

				return upload;
			}).forEach(upload => {
				newState[upload._id] = upload
			});

			return {
				...state,
				...newState
			};

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
