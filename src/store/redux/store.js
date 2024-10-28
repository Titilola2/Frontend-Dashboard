// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import activityReducer from './activitySlice';
import likeReducer from './likesSlice'; // Import likeReducer

const store = configureStore({
  reducer: {
    activity: activityReducer,
    like: likeReducer, 
  },
});

export default store;
