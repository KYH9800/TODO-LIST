import React from 'react';
import { useRouter } from 'next/router';

// AppLayout
import AppLayout from '../../components/AppLayout';

// styled-components
import styled from 'styled-components';

// mock
import { detailTodoList } from '../../mock/mockData';

const DetailTodoListPage = () => {
  const router = useRouter();
  const { id } = router.query;
  console.log('id: ', id);

  return (
    <AppLayout>
      <div>
        <div>
          <button>목록으로</button>
        </div>

        <div>
          <h3>{detailTodoList.todo}</h3>
        </div>
        <div>
          {detailTodoList.detailContent ? detailTodoList.detailContent : <h5>상세 계획이 존재하지 않습니다.</h5>}
        </div>
        <div>
          <span>작성일: </span> <span>{detailTodoList.createdAt}</span>
        </div>
      </div>
    </AppLayout>
  );
};

export default DetailTodoListPage;
