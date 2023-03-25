import { all, fork } from 'redux-saga/effects';
import axios from 'axios';

import { backURL } from '../config/config';

import todoSaga from './todo';
import userSaga from './user';

axios.defaults.baseURL = backURL;
axios.defaults.withCredentials = true;
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';

export default function* rootSaga() {
  yield all([fork(userSaga), fork(todoSaga)]);
}
