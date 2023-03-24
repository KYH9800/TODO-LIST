const express = require('express');
const router = express.Router();

const TodoController = require('../controllers/todo.controller');
const todoController = new TodoController();

const { isLoggedIn } = require('../../middlewares/isLoggedIn'); // 로그인된 사용자만 접근이 가능합니다.

router
  .post('/', isLoggedIn, todoController.addTodo) // :TODO 생성
  .get('/', isLoggedIn, todoController.getAllTodos) // :TODO 전체조회
  .get('/:todo_id', isLoggedIn, todoController.getDetailTodo); // :TODO 상세조회

module.exports = router;
