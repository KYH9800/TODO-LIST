import React from 'react';

// AppLayout
import AppLayout from '../../components/AppLayout';

// styled-components
import { PageTitle } from '../myTodoList';

// components
import TodoLists from '../../components/myTodoListPage/TodoLists';

// mock
import { successTodoLists } from '../../mock/mockData';

const SuccessList = () => {
  // TODO

  return (
    <AppLayout>
      <PageTitle>완료 목록</PageTitle>
      <TodoLists data={successTodoLists} />
    </AppLayout>
  );
};

export default SuccessList;
