import React from 'react';

// AppLayout
import AppLayout from '../../components/AppLayout';

// styled-components
import styled from 'styled-components';

// components
import TodoLists from '../../components/myTodoListPage/TodoLists';

// mock
import { todoLists } from '../../mock/mockData';

const MyTodoList = () => {
  // TODO

  return (
    <AppLayout>
      <PageTitle>할일 목록</PageTitle>
      <TodoLists data={todoLists} />
    </AppLayout>
  );
};

export default MyTodoList;

export const PageTitle = styled.h1`
  font-size: 22px;
  font-weight: 600;

  @media (max-width: 1200px) {
    font-size: 17px;
  }
`;
