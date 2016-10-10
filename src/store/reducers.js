import { combineReducers } from 'redux'
import locationReducer from './location'
import { userReducer, tokenReducer } from './user';

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    location: locationReducer,
    user: userReducer,
    token: tokenReducer,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
