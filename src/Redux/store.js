import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './slice/dataSlice';
import counter from "./slice/counterSlice"

export const store = configureStore({
  reducer: {
    data: dataReducer,
    counter,
  },
});