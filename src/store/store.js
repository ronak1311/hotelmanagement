import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { roomReducer } from './roomReducer.js';
import { reservationReducer } from './reservationReducer.js';
import { addOnsReducer } from './addOnsReducer.js';
import { bookingsReducer } from './bookingsReducer.js';

const allReducers = combineReducers({
    roomReducer: roomReducer,
    reservationReducer: reservationReducer,
    addOnsReducer: addOnsReducer,
    bookingsReducer: bookingsReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(allReducers, composeEnhancers(applyMiddleware()));