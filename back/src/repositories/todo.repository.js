const { Op } = require('sequelize');

class TodoRepository {
  constructor(TodoModel) {
    this.todoModel = TodoModel;
  }

  // :TODO 생성
  addTodo = async (user_id, todo, detailContent, done) => {
    const addTodo = await this.todoModel.create({
      user_id: user_id,
      todo: todo,
      detailContent: detailContent,
      done: done,
    });

    return addTodo;
  };

  // :TODO 전체조회
  getAllTodos = async (user_id, lastId) => {
    const where = { user_id: user_id };

    // https://velog.io/@cadenzah/sequelize-document-2
    if (parseInt(lastId, 10)) {
      where.todo_id = { [Op.gt]: parseInt(lastId, 10) }; // Op: Operator 정순
    }

    // https://stackoverflow.com/questions/36259532/sequelize-findall-sort-order-in-nodejs
    const todos = await this.todoModel.findAll({
      where,
      order: [['createdAt', 'ASC']], // 순서대로
      limit: 25,
    });

    return todos;
  };

  // :TODO 상세조회
  getDetailTodo = async (todo_id) => {
    const detailTodo = await this.todoModel.findOne({
      where: {
        todo_id: todo_id,
      },
    });

    return detailTodo;
  };

  // :TODO 수정
  updateTodo = async (user_id, todo_id, todo, detailContent, done) => {
    const updateTodo = await this.todoModel.update(
      {
        todo: todo,
        detailContent: detailContent,
        done: done,
      },
      {
        where: {
          user_id: user_id,
          todo_id: todo_id,
        },
      }
    );

    return updateTodo;
  };

  // :TODO 삭제
  deleteTodo = async (user_id, todo_id) => {
    const deleteTodo = await this.todoModel.destroy({
      where: {
        user_id: user_id,
        todo_id: todo_id,
      },
    });

    return deleteTodo;
  };
}

module.exports = TodoRepository;
