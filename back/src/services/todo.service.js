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
const get_all_todos = async (user_id) => {
  const todos = await todoRepository.getAllTodos(user_id);

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

module.exports = {
  add_todo,
  get_all_todos,
  get_detail_todo,
};
