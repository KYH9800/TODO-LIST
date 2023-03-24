class TodoRepository {
  constructor(TodoModel) {
    this.todoModel = TodoModel;
  }

  // :TODO 생성
  addTodo = async (todo, detailContent, done) => {
    // todo: db에 저장하기
    console.log('todo: ', todo);
    console.log('detailContent: ', detailContent); // null 허용
    console.log('done: ', done);

    return {
      todo: todo,
      detailContent: detailContent,
      done: done,
    };
  };

  // :TODO 전체조회
  getAllTodos = async () => {
    // const addTodo = await
  };

  // :TODO 상세조회
  getDetailTodo = async () => {
    // const detailTodo = await
  };
}

module.exports = TodoRepository;
