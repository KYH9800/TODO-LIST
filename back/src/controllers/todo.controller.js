const { add_todo, get_all_todos, get_detail_todo, update_todo, delete_todo } = require('../services/todo.service');

class TodoController {
  // :TODO 생성
  addTodo = async (req, res) => {
    try {
      const user_id = res.locals.user;
      const { todo, detailContent, done } = req.body;

      const addTodo = await add_todo(user_id, todo, detailContent, done);

      return res.status(200).send({
        message: 'TODO 생성 성공',
        addTodo: Boolean(addTodo),
      });
    } catch (error) {
      console.log(error);
      if (error.statusCode) {
        return res.status(error.statusCode).json({
          errorMessage: error.message,
          status: error.statusCode,
        });
      } else {
        return res.status(400).json({ errorMessage: 'TODO 생성에 실패 했습니다.' });
      }
    }
  };

  // :TODO 전체조회
  getAllTodos = async (req, res) => {
    try {
      const user_id = res.locals.user;
      const { lastId } = req.query;

      const todos = await get_all_todos(user_id, lastId);

      return res.status(200).send({
        todos,
      });
    } catch (error) {
      console.log(error);
      if (error.statusCode) {
        return res.status(error.statusCode).json({
          errorMessage: error.message,
          status: error.statusCode,
        });
      } else {
        return res.status(400).json({ errorMessage: 'TODO 전체 조회에 실패 했습니다.' });
      }
    }
  };

  // :TODO 상세조회
  getDetailTodo = async (req, res) => {
    try {
      const { todo_id } = req.params;

      const todo = await get_detail_todo(todo_id);

      return res.status(200).send({
        todo,
      });
    } catch (error) {
      console.log(error);
      if (error.statusCode) {
        return res.status(error.statusCode).json({
          errorMessage: error.message,
          status: error.statusCode,
        });
      } else {
        return res.status(400).json({ errorMessage: 'TODO 상세조회에 실패 했습니다.' });
      }
    }
  };

  // :TODO 수정
  updateTodo = async (req, res) => {
    try {
      const user_id = res.locals.user;
      const { todo_id, todo, detailContent, done } = req.body;

      const updateTodo = await update_todo(user_id, todo_id, todo, detailContent, done);

      return res.status(200).send({
        message: 'update success',
        result: Boolean(updateTodo),
      });
    } catch (error) {
      console.log(error);
      if (error.statusCode) {
        return res.status(error.statusCode).json({
          errorMessage: error.message,
          status: error.statusCode,
        });
      } else {
        return res.status(400).json({ errorMessage: 'TODO 수정에 실패 했습니다.' });
      }
    }
  };

  // :TODO 삭제
  deleteTodo = async (req, res) => {
    try {
      const user_id = res.locals.user;
      const { todo_id } = req.params;

      const deleteTodo = await delete_todo(user_id, todo_id);

      return res.status(200).send({
        message: 'delete success',
        result: Boolean(deleteTodo),
      });
    } catch (error) {
      console.log(error);
      if (error.statusCode) {
        return res.status(error.statusCode).json({
          errorMessage: error.message,
          status: error.statusCode,
        });
      } else {
        return res.status(400).json({ errorMessage: 'TODO 삭제에 실패 했습니다.' });
      }
    }
  };
}

module.exports = TodoController;
