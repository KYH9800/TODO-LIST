const express = require('express');
const router = express.Router();

const TodoController = require('../controllers/todo.controller');
const todoController = new TodoController();

// router.post('/', isLoggedIn, awsUpload.none(), todoController.addTodo); // 게시글 생성
router
  .post('/', todoController.addTodo) // :TODO 생성
  .get('/', todoController.getAllTodos) // :TODO 전체조회
  .get('/:todo_id', todoController.getDetailTodo); // :TODO 상세조회

module.exports = router;
