import { all, fork } from 'redux-saga/effects';
import axios from 'axios';

import { Cookies } from 'react-cookie';
const cookies = new Cookies();

import { backURL } from '../config/config';

import todoSaga from './todo';
import userSaga from './user';

const accessToken = cookies.get('accessToken');
const refreshToken = cookies.get('refreshToken');

axios.defaults.baseURL = backURL;
axios.defaults.withCredentials = true;
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';

export default function* rootSaga() {
  yield all([fork(userSaga), fork(todoSaga)]);
}
