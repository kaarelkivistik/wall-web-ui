import React from 'react'
import ReactDOM from 'react-dom'

import createStore from './store/createStore'
import AppContainer from './containers/AppContainer'
import { restoreTokenFromCookie } from './modules/index';

// ========================================================
// Store Instantiation
// ========================================================
const initialState = window.___INITIAL_STATE__
const store = createStore(initialState)

const subscribers = []
const installSubscribers = () => {
  subscribers.forEach(subscriber => subscriber())

  const { authenticationSubscriber, tokenHandler } = require("./modules/index");

  subscribers.push(store.subscribe(authenticationSubscriber.bind(store)))
  subscribers.push(store.subscribe(tokenHandler.bind(store)))
}

// ========================================================
// Render Setup
// ========================================================
const MOUNT_NODE = document.getElementById('root')

let render = () => {
  const routes = require('./routes/index').default(store)

  ReactDOM.render(
    <AppContainer store={store} routes={routes} />,
    MOUNT_NODE
  )
}

// This code is excluded from production bundle
if (__DEV__) {
  if (module.hot) {
    // Development render functions
    const renderApp = render
    const renderError = (error) => {
      const RedBox = require('redbox-react').default

      ReactDOM.render(<RedBox error={error} />, MOUNT_NODE)
    }

    // Wrap render in try/catch
    render = () => {
      try {
        renderApp()
      } catch (error) {
        renderError(error)
      }
    }

    // Setup hot module replacement
    module.hot.accept('./routes/index', () =>
      setImmediate(() => {
        ReactDOM.unmountComponentAtNode(MOUNT_NODE)
        render()
      })
    )

    module.hot.accept('./modules/index', () =>
      setImmediate(() => {
        installSubscribers()
      })
    )
  }
}

// ========================================================
// Go!
// ========================================================
installSubscribers()
restoreTokenFromCookie(store).then(render)
