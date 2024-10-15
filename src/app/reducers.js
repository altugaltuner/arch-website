import { combineReducers } from 'redux';

// Example reducer
const counterReducer = (state = 0, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            return state - 1;
        default:
            return state;
    }
};

// Combine reducers
const rootReducer = combineReducers({
    counter: counterReducer,
    // You can add more reducers here as your app grows
});

export default rootReducer;
