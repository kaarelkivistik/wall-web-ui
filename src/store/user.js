import { CALL_API } from 'redux-api-middleware';

export const SET_TOKEN = "SET_TOKEN"
export const FETCH_USER_INFO_REQUEST = "FETCH_USER_INFO_REQUEST"
export const FETCH_USER_INFO_SUCCESS = "FETCH_USER_INFO_SUCCESS"
export const FETCH_USER_INFO_FAILURE = "FETCH_USER_INFO_FAILURE"

export function fetchUserInfo(token) {
	return {
		[CALL_API]: {
			endpoint: apiUrl + "/me",
			method: "GET",
			types: ["FETCH_USER_INFO_REQUEST", "FETCH_USER_INFO_SUCCESS", "FETCH_USER_INFO_FAILURE"],
			headers: state => {
				return {
					"Authorization": "Bearer " + state.token
				}
			},
			bailout: state => {
				const { token } = state;
				return token == null
			}
		}
	}
}

export function setToken(token) {
	return {
		type: SET_TOKEN,
		token,
	}
}

const tokenInitialState = null
export function tokenReducer(state = tokenInitialState, action) {
	const { payload } = action;
	switch(action.type) {
		case SET_TOKEN:
			return action.token ? action.token : tokenInitialState

		default:
			return state
	}
}

const userInitialState = null
export function userReducer(state = userInitialState, action) {
	const { payload } = action;
	switch(action.type) {
		case SET_TOKEN:
			return action.token === null ? userInitialState : state

		case FETCH_USER_INFO_SUCCESS:
			const { user } = payload;
			const { name, username } = user;

			return {
				name,
				username,	
			}

		case FETCH_USER_INFO_FAILURE:
			return userInitialState

		default:
			return state
	}
}
