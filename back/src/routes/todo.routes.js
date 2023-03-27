const express = require('express');
const router = express.Router();

const TodoController = require('../controllers/todo.controller');
const todoController = new TodoController();

const { isLoggedIn } = require('../../middlewares/isLoggedIn'); // 로그인된 사용자만 접근이 가능합니다.

router
  .post('/', todoController.addTodo) // :TODO 생성
  .get('/', todoController.getAllTodos) // :TODO 전체조회
  .get('/:todo_id', todoController.getDetailTodo) // :TODO 상세조회
  .patch('/:todo_id', todoController.updateTodo) // :TODO 수정
  .delete('/:todo_id', todoController.deleteTodo); // :TODO 삭제

// .post('/', isLoggedIn, todoController.addTodo) // :TODO 생성
// .get('/', isLoggedIn, todoController.getAllTodos) // :TODO 전체조회
// .get('/:todo_id', isLoggedIn, todoController.getDetailTodo) // :TODO 상세조회
// .patch('/:todo_id', isLoggedIn, todoController.updateTodo) // :TODO 수정
// .delete('/:todo_id', isLoggedIn, todoController.deleteTodo); // :TODO 삭제

module.exports = router;
