import { combineReducers } from 'redux';

import { createStore, applyMiddleware } from 'redux';
import { reducer as formReducer } from 'redux-form'
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

import auth from './auth';
import product from './product';
import rootSaga from '../../sagas';

const sagaMiddleware = createSagaMiddleware();

const reducer = combineReducers({
  auth,
  product,
  form: formReducer
});

const store = createStore(reducer, composeWithDevTools(
  applyMiddleware(sagaMiddleware)
));

sagaMiddleware.run(rootSaga)

export default function configureStore() {
  return store;
}
