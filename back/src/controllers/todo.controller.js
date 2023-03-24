const { add_todo, get_all_todos, get_detail_todo } = require('../services/todo.service');

class TodoController {
  // :TODO 생성
  addTodo = async (req, res) => {
    const { todo, detailContent, done } = req.body;

    const addTodo = await add_todo(todo, detailContent, done);

    return res.status(200).send({
      message: 'TODO 생성',
      addTodo,
    });
  };

  // :TODO 전체조회
  getAllTodos = async (req, res) => {
    // todo...

    return res.status(200).send('TODO 전체조회');
  };

  // :TODO 상세조회
  getDetailTodo = async (req, res) => {
    const { todo_id } = req.params;
    // todo...

    return res.status(200).send({
      todo_id: todo_id,
    });
  };
}

module.exports = TodoController;
