import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
// import { createLogger } from 'redux-logger';
import logger from 'redux-logger';
import reducer from '../models';

// const logger = createLogger();

const configure = () => createStore(reducer, applyMiddleware(thunk, logger));

export default configure;
