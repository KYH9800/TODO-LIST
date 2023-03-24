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
  getAllTodos = async (user_id) => {
    const todos = await this.todoModel.findAll({
      where: {
        user_id: user_id,
      },
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
}

module.exports = TodoRepository;
