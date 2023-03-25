import React, { useEffect } from 'react';
import Router from 'next/router';

// AppLayout
import AppLayout from '../../components/AppLayout';

// styled-components
import styled from 'styled-components';

// components
import TodoLists from '../../components/myTodoListPage/TodoLists';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { LOAD_MY_INFO_REQUEST, LOGOUT_REQUEST } from '../../reducers/user';
import { LOAD_TODOS_REQUEST } from '../../reducers/todo';

// redux, server side rendering
import { END } from 'redux-saga';
import axios from 'axios';
import wrapper from '../../store/configureStore';

const MyTodoList = () => {
  const dispatch = useDispatch();
  const { me, loadMyInfoError } = useSelector((state) => state.user);
  const { hasMoreTodos, loadTodosLoading, mainTodos } = useSelector((state) => state.todo);

  useEffect(() => {
    if (!me && !mainTodos) {
      Router.replace('/');
    }
  }, [me, mainTodos]);

  useEffect(() => {
    if (loadMyInfoError) {
      dispatch({
        type: LOGOUT_REQUEST,
      });
    }
  }, [loadMyInfoError]);

  // 무한스크롤
  useEffect(() => {
    // comopnentDidMount()
    function onScroll() {
      if (window.pageYOffset + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
        console.log('hasMoreTodos: ', hasMoreTodos);
        console.log('loadTodosLoading: ', loadTodosLoading);

        if (hasMoreTodos && !loadTodosLoading) {
          const lastId = mainTodos[mainTodos.length - 1]?.todo_id;
          console.log('lastId: ', lastId);

          dispatch({
            type: LOAD_TODOS_REQUEST,
            lastId: lastId,
          });
        }
      }
    }
    window.addEventListener('scroll', onScroll);
    // componentWillUnmount()
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [hasMoreTodos, loadTodosLoading, mainTodos]);

  return (
    <AppLayout>
      <PageTitle>할일 목록</PageTitle>

      {mainTodos.filter((v) => v.done === 0).length !== 0 ? (
        <TodoLists data={mainTodos.filter((v) => v.done === 0)} />
      ) : (
        <p>작업 내용이 존재하지 않습니다.</p>
      )}
    </AppLayout>
  );
};

// Server Side Rendering
export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req }) => {
  const cookie = req ? req.headers.cookie : ''; // req가 있다면 cookie에 요청에 담겨진 cookie를 할당한다.
  axios.defaults.headers.Cookie = ''; // 요청이 들어올 때마다 초기화 시켜주는 것이다. 여기는 클라이언트 서버에서 실행되므로 이전 요청이 남아있을 수 있기 때문이다

  if (req && cookie) {
    axios.defaults.headers.Cookie = cookie; // 서버일때랑 cookie를 써서 요청을 보낼 때만 headers에 cookie를 넣어준다
  }

  store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  });

  store.dispatch({
    type: LOAD_TODOS_REQUEST,
  });

  store.dispatch(END);
  await store.sagaTask.toPromise(); // store/configureStore.js > store.sagaTask
});

export default MyTodoList;

// styled-components
export const PageTitle = styled.h1`
  font-size: 22px;
  font-weight: 600;

  @media (max-width: 1200px) {
    font-size: 17px;
  }
`;
