import { createStore } from 'redux';
import { roomReducer } from './roomReducer.js';

export const store = createStore(roomReducer);