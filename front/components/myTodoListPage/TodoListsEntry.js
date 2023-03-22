import React from 'react';

// styled-components
import {
  TodoBox,
  FrontLine,
  CustomLink,
  CheckInput,
  DateLine,
  DetailTodo,
} from '../../styles/myTodoListPage/TodoListsEntrySt';

const TodoListsEntry = ({ data }) => (
  <TodoBox>
    <CheckInput type="checkbox" />

    <CustomLink href={`/${data.done === 0 ? 'myTodoList' : 'doneTodoList'}/${data.id}`}>
      <FrontLine>
        <div>
          <div>{data.todo} </div>
        </div>
        <DateLine>{data.createdAt} </DateLine>
      </FrontLine>

      <DetailTodo>{data.detailContent}</DetailTodo>
    </CustomLink>
  </TodoBox>
);

export default TodoListsEntry;
