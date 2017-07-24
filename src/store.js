import { applyMiddleware, createStore } from 'redux';
import rootReducer from './Reducers';

import logger from 'redux-logger'
import thunk from 'redux-thunk';

const initialState = {};
const enhancers = [];

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.devToolsExtension;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}

// Logger with default options
const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(thunk, logger)
);

export default store;
