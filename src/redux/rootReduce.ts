import { combineReducers } from 'redux';
import { authReducer } from './reducers/authReducer';
import { languageReducer } from './reducers/utilsReducer';
import { orderReducer } from './reducers/orderReducer';

/**
 * The root reducer function that combines all the individual reducers.
 * @returns The combined state object.
 */
const rootReducer = combineReducers({
  auth: authReducer.reducer,
  languaje: languageReducer.reducer,
  order: orderReducer.reducer
});

export default rootReducer;