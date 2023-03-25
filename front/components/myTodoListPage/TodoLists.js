import React from 'react';

// components
import TodoListsEntry from './TodoListsEntry';

const TodoLists = ({ data }) => {
  return (
    <div>
      {data?.map((data, idx) => (
        <TodoListsEntry key={idx} data={data} num={idx + 1} />
      ))}
    </div>
  );
};

export default TodoLists;
