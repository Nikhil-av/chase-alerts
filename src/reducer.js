// reducers.js
import { combineReducers } from 'redux';
import appReducer from './sliceReducer';

const rootReducer = combineReducers({
  slice: appReducer,
  // Add more slice reducers as needed
});

export default rootReducer;
