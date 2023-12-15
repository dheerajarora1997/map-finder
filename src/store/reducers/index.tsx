import { combineReducers } from '@reduxjs/toolkit';
import userDetailReducer from './LoginSlice'; 

const rootReducer = combineReducers({
  userDetails : userDetailReducer,
});

export default rootReducer;
