import { AppContainer } from 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { apiMiddleware } from 'redux-api-middleware';
import { CALL_API } from 'redux-api-middleware';
import Logger from 'redux-logger';

import { uploads } from './uploads/redux';

const createStoreWithMiddleware = applyMiddleware(apiMiddleware, Logger())(createStore);

const store = createStoreWithMiddleware(combineReducers({
	uploads
}));

const rootEl = document.getElementById('root');
ReactDOM.render(
	<Provider store={store}>
		<App/>
	</Provider>,
	rootEl
);

if (module.hot) {
	module.hot.accept('./App', () => {
		// If you use Webpack 2 in ES modules mode, you can
		// use <App /> here rather than require() a <NextApp />.
		const NextApp = require('./App').default;
		ReactDOM.render(
			<AppContainer>
				<Provider store={store}>
					<NextApp />
				</Provider>
			</AppContainer>,
			rootEl
		);
	});
}