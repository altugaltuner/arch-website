import { configureStore } from '@reduxjs/toolkit';
import counterSlice from '../features/counter/counterSlice';
import rootReducer from './reducers';  // Make sure you have your reducers

export const store = configureStore({
    reducer: {
        counter: counterSlice,
        rootReducer,
    },
});


