import { CALL_API } from 'redux-api-middleware';
import { createSelector } from 'reselect'
import qs from 'qs';

export const FETCH_UPLOADS_REQUEST = "FETCH_UPLOADS_REQUEST"
export const FETCH_UPLOADS_SUCCESS = "FETCH_UPLOADS_SUCCESS"
export const FETCH_UPLOADS_APPEND_SUCCESS = "FETCH_UPLOADS_APPEND_SUCCESS"
export const FETCH_UPLOADS_FAILURE = "FETCH_UPLOADS_FAILURE"
export const APPEND_UPLOADS = "APPEND_UPLOADS"

export function fetchUploads(startingFrom, limit, append = false) {
	const query = {};

	if(startingFrom)
		query.startingFrom = startingFrom;

	if(limit)
		query.limit = limit;

	return {
		[CALL_API]: {
			endpoint: apiUrl + "?" + qs.stringify(query),
			method: "GET",
			types: [
				FETCH_UPLOADS_REQUEST,
				append ? FETCH_UPLOADS_APPEND_SUCCESS : FETCH_UPLOADS_SUCCESS,
				FETCH_UPLOADS_FAILURE,
			]
		}
	}
}

export function appendUploads() {
	return {
		type: APPEND_UPLOADS,
		payload: Array.prototype.slice.call(arguments)
	}
}

function normalizeUpload(upload) {
	return {
		...upload,
		timestamp: new Date(upload.timestamp),
		user: {
			id: upload.user.id,
			name: upload.user.name,
			username: upload.user.username,
		},
	}
}

const initialState = {}
export default function uploadsReducer(state = initialState, action) {
	switch(action.type) {
		case FETCH_UPLOADS_SUCCESS:
			const nextState = {}

			action.payload.forEach(upload => {
				nextState[upload._id] = normalizeUpload(upload)
			})

			return nextState

		case APPEND_UPLOADS:
		case FETCH_UPLOADS_APPEND_SUCCESS:
			const mergeState = {}

			action.payload.forEach(upload => {
				mergeState[upload._id] = normalizeUpload(upload)
			})

			return {
				...state,
				...mergeState,	
			}

		default:
			return state

	}
}

const getUploads = state => state.uploads;

export const uploadsOrderByDate = createSelector(
	[getUploads],
	(uploads) => {
		let keys = Object.keys(uploads);

		keys.sort((a, b) => {
			return uploads[a].timestamp > uploads[b].timestamp ? -1 : 1;
		});

		return keys;
	}
)
