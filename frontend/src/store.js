import { combineReducers, applyMiddleware, createStore } from 'redux'

import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { userRegisterReducer, userLoginReducer } from './reducers/userReducers'
import {
  postCreateReducer,
  postDeleteReducer,
  postDetailsReducer,
  postListReducer,
  postUpdateReducer,
} from './reducers/postReducers'

const reducer = combineReducers({
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
  postList: postListReducer,
  postCreate: postCreateReducer,
  postDetails: postDetailsReducer,
  postDelete: postDeleteReducer,
  postUpdate: postUpdateReducer,
})

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
