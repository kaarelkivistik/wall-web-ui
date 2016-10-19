import { cookie } from 'redux-effects-cookie'
import { browserHistory } from 'react-router'
import { fetchUserInfo, setToken } from '../store/user'

export function authenticationSubscriber () {
  const state = this.getState()

  const { location: { query, pathname }, token } = state
  const { token: newToken } = query

  if (!newToken) {
    return
  }

  if (token !== newToken) {
    this.dispatch(setToken(newToken))
  } else {
    browserHistory.replace(pathname)
  }
}

let previousToken
export function tokenHandler () {
  const state = this.getState()

  const { token } = state

  if (token !== previousToken) {
    this.dispatch(cookie('token', token))
    this.dispatch(fetchUserInfo())
  }

  previousToken = token
}

export function restoreTokenFromCookie (store) {
  return store.dispatch(cookie('token')).then(token => {
    return store.dispatch(setToken(token))
  })
}
