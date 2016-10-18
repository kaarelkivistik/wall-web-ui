import { combineReducers } from 'redux'
import locationReducer from './location'
import { userReducer, tokenReducer } from './user'
import { uploadsReducer } from 'routes/Home/modules/uploads'
import { newUploadReducer } from 'routes/Upload/modules/newUpload'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    location: locationReducer,
    user: userReducer,
    token: tokenReducer,
    uploads: uploadsReducer,
    newUpload: newUploadReducer,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
