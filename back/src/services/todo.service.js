const { Todo } = require('../../models');

const TodoRepository = require('../repositories/todo.repository');
const todoRepository = new TodoRepository(Todo);

// :TODO 생성
const add_todo = async (todo, detailContent, done) => {
  if (!todo) {
    // todo: todo 내용이 없으면 custom error 전송
  }

  if (!done) {
    // todo: done상태가 없으면 custom error 전송
  }

  const add_todo = await todoRepository.addTodo(todo, detailContent, done);

  return add_todo;
};

// :TODO 전체조회
const get_all_todos = async () => {
  //
};

// :TODO 상세조회
const get_detail_todo = async () => {
  //
};

module.exports = {
  add_todo,
  get_all_todos,
  get_detail_todo,
};
