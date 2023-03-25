const { Todo } = require('../../models');

const TodoRepository = require('../repositories/todo.repository');
const todoRepository = new TodoRepository(Todo);

// custom error
const { CustomError } = require('../../utils/Error');

// :TODO 생성
const add_todo = async (user_id, todo, detailContent, done) => {
  if (!user_id) {
    throw new CustomError('로그인 후 이용이 가능합니다.', 403);
  }

  if (!todo) {
    throw new CustomError('작업 내용이 입력되지 않았습니다.', 412);
  }

  if (!done === null || !done === undefined) {
    throw new CustomError('완료 여부가 이력되지 않았습니다.', 412);
  }

  const add_todo = await todoRepository.addTodo(user_id, todo, detailContent, done);

  return add_todo;
};

// :TODO 전체조회
const get_all_todos = async (user_id, lastId) => {
  const todos = await todoRepository.getAllTodos(user_id, lastId);

  return todos;
};

// :TODO 상세조회
const get_detail_todo = async (todo_id) => {
  if (!todo_id) {
    throw new CustomError('게시글 정보가 존재하지 않습니다.', 404);
  }

  const todo = await todoRepository.getDetailTodo(todo_id);

  if (!todo) {
    throw new CustomError('작업 내용이 존재하지 않습니다.', 404);
  }

  return todo;
};

// :TODO 수정
const update_todo = async (user_id, todo_id, todo, detailContent, done) => {
  const find_todo = await todoRepository.getDetailTodo(todo_id);

  if (!find_todo) {
    throw new CustomError('수정하고자 하는 작업 내용이 존재하지 않습니다.', 404);
  }

  if (user_id !== find_todo.user_id) {
    throw new CustomError('내가 작성한 작업내용이 아닙니다.', 403);
  }

  const update_todo = await todoRepository.updateTodo(user_id, todo_id, todo, detailContent, done);

  return update_todo;
};

// :TODO 삭제
const delete_todo = async (user_id, todo_id) => {
  const find_todo = await todoRepository.getDetailTodo(todo_id);

  if (!find_todo) {
    throw new CustomError('삭제하고자 하는 작업 내용이 존재하지 않습니다.', 404);
  }

  if (user_id !== find_todo.user_id) {
    throw new CustomError('내가 작성한 작업내용이 아닙니다.', 403);
  }

  const delete_todo = await todoRepository.deleteTodo(user_id, todo_id);

  return delete_todo;
};

module.exports = {
  add_todo,
  get_all_todos,
  get_detail_todo,
  update_todo,
  delete_todo,
};
