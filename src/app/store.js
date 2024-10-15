import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';  // Make sure you have your reducers

export const store = configureStore({
    reducer: {
        rootReducer,
    },
});


