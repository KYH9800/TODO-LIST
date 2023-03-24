import { createWrapper } from 'next-redux-wrapper';
import { applyMiddleware, compose, legacy_createStore as createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import createSagaMiddleware from 'redux-saga';

import reducer from '../reducers';
import rootSaga from '../sagas';

const loggerMiddleware =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    console.log('loggerMiddleware(redux-thunk): ', action);
    return next(action);
  };

// configureStore 여기에서는 일반 redux와 비슷
const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware(); // redux-saga

  const enhancer = // 배포용일떄 ? devTool 연결 X : devTool 연결 O
    process.env.NODE_ENV === 'production'
      ? compose(applyMiddleware(sagaMiddleware))
      : composeWithDevTools(applyMiddleware(sagaMiddleware, loggerMiddleware));

  const store = createStore(reducer, enhancer); // state와 reducer를 포함하는게 store

  store.sagaTask = sagaMiddleware.run(rootSaga);
  return store;
};

const wrapper = createWrapper(configureStore, {
  debug: process.env.NODE_ENV === 'development',
}); // 두번째는 옵션 객체

export default wrapper;
