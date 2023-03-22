import React from 'react';

// components
import TodoListsEntry from './TodoListsEntry';

const TodoLists = ({ data }) => {
  return (
    <div>
      {data.map((data, idx) => (
        <TodoListsEntry key={idx} data={data} />
      ))}
    </div>
  );
};

export default TodoLists;
