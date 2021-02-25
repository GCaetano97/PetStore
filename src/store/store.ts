import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import notificationReducer from './reducers/notificationReducer';
import petReducer from './reducers/petReducer';
import userReducer from './reducers/userReducer';

const reducer = combineReducers({
  notificationReducer,
  petReducer,
  userReducer,
});

const store = createStore(reducer, composeWithDevTools());

export default store;
