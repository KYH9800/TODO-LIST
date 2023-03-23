import React, { useRef } from 'react';
import { useRouter } from 'next/router';

// AppLayout
import AppLayout from '../../components/AppLayout';

// styled-components
import { PageTitle } from './';
import { Modal, DetailBox } from '../../styles/pages/DetailPageSt';

// components
import TodoLists from '../../components/myTodoListPage/TodoLists';
import DetailComponent from '../../components/detailMyTodo/DetailComponent';

// mock
import { todoLists, detailTodoList } from '../../mock/mockData';

const DetailTodoListPage = () => {
  const router = useRouter();
  const { id } = router.query;
  console.log('id: ', id);

  const detailmodal = useRef();

  return (
    <AppLayout>
      <PageTitle>할일 목록</PageTitle>
      <TodoLists data={todoLists} />

      <Modal>
        <DetailBox ref={detailmodal}>
          <DetailComponent detailTodoList={detailTodoList} detailmodal={detailmodal} />
        </DetailBox>
      </Modal>
    </AppLayout>
  );
};

export default DetailTodoListPage;
