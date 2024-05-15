import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReduce';
import { loadState, saveState } from '../helpers/localStorage';

const preloadedState = loadState();

/**
 * The Redux store.
 */
const store = configureStore({
  reducer: rootReducer,
  preloadedState,
});

store.subscribe(() => {
  saveState(store.getState());
});

export default store;
