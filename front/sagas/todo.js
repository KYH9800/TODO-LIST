import { all, fork, put, call, takeLatest, delay } from 'redux-saga/effects';
import axios from 'axios';

import {
  ADD_TODO_REQUEST,
  ADD_TODO_SUCCESS,
  ADD_TODO_FAILURE,
  LOAD_TODOS_REQUEST,
  LOAD_TODOS_SUCCESS,
  LOAD_TODOS_FAILURE,
  LOAD_TODO_REQUEST,
  LOAD_TODO_SUCCESS,
  LOAD_TODO_FAILURE,
  UPDATE_TODO_REQUEST,
  UPDATE_TODO_SUCCESS,
  UPDATE_TODO_FAILURE,
  REMOVE_TODO_REQUEST,
  REMOVE_TODO_SUCCESS,
  REMOVE_TODO_FAILURE,
} from '../reducers/todo';

// :TODO 생성
function addTodoAPI(data) {
  return axios.post('/todo', data);
}

function* addTodo(action) {
  try {
    const result = yield call(addTodoAPI, action.data);

    yield put({
      type: ADD_TODO_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADD_TODO_FAILURE,
      error: err.response.data,
    });
  }
}

// 전체 TODOS 불러오기
function loadTodosAPI(lastId) {
  return axios.get(`/todo?lastId=${lastId || 0}`); // 10 불러오고 없으면 0
  // return axios.get(`/todo`);
}

function* loadTodos(action) {
  console.log('action: ', action.lastId);
  try {
    const result = yield call(loadTodosAPI, action.lastId);

    yield put({
      type: LOAD_TODOS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_TODOS_FAILURE,
      error: err.response.data,
    });
  }
}

// 단일 TODO 상세조회
function loadTodoAPI(data) {
  return axios.get(`/todo/${data}`);
}
function* loadTodo(action) {
  try {
    const result = yield call(loadTodoAPI, action.data);
    yield put({
      type: LOAD_TODO_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    put({
      type: LOAD_TODO_FAILURE,
      error: err.response.data,
    });
  }
}

// :TODO 수정
function updateTodoAPI(data) {
  return axios.patch(`/todo/${data.todo_id}`, data);
}

function* updateTodo(action) {
  try {
    const result = yield call(updateTodoAPI, action.data);

    yield put({
      type: UPDATE_TODO_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UPDATE_TODO_FAILURE,
      error: err.response.data,
    });
  }
}

// :TODO 삭제
function removeTodoAPI(data) {
  return axios.delete(`/todo/${data.todo_id}`); // data: post.id
} // post/post.id

function* removeTodo(action) {
  try {
    const result = yield call(removeTodoAPI, action.data);

    yield put({
      type: REMOVE_TODO_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: REMOVE_TODO_FAILURE,
      error: err.response.data,
    });
  }
}

// :TODO 추가
function* watchAddTodo() {
  yield takeLatest(ADD_TODO_REQUEST, addTodo);
}

// 전체 TODO 조회
function* watchLoadTodos() {
  yield takeLatest(LOAD_TODOS_REQUEST, loadTodos); // n초 동안은 한번만 요청이 간다 (throttle)
}

// 단일 TODO 조회 (상세조회)
function* watchLoadTodo() {
  yield takeLatest(LOAD_TODO_REQUEST, loadTodo);
}

// :TODO 수정
function* watchUpdateTodo() {
  yield takeLatest(UPDATE_TODO_REQUEST, updateTodo);
}

// :TODO 삭제
function* watchRemoveTodo() {
  yield takeLatest(REMOVE_TODO_REQUEST, removeTodo);
}

export default function* todoSaga() {
  yield all([
    fork(watchAddTodo), // :TODO 추가
    fork(watchLoadTodos), // 전체 TODO 조회
    fork(watchLoadTodo), // 단일 TODO 조회 (상세조회)
    fork(watchUpdateTodo), // :TODO 수정
    fork(watchRemoveTodo), // :TODO 삭제
  ]);
}
