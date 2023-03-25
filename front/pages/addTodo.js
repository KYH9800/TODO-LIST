import React, { useState, useEffect, useRef } from 'react';
import Router from 'next/router';

// styled-components
import { Wrapper, Form, PageTilte, SubTitle, Input, Textarea, BtnWrapper, Button } from '../styles/pages/addTodoSt';

// AppLayout
import AppLayout from '../components/AppLayout';

// custom hooks
import useInput from '../hooks/useInput';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';
import { ADD_TODO_REQUEST } from '../reducers/todo';

// redux, server side rendering
import { END } from 'redux-saga';
import axios from 'axios';
import wrapper from '../store/configureStore';

/* TODO LIST 생성 */
const AddTodo = () => {
  const dispatch = useDispatch();
  const addMenu = useRef();

  const [todo, onChangeTodo] = useInput('');
  const [detailContent, onChangeDetailContent] = useInput('');

  const { me, loadMyInfoError } = useSelector((state) => state.user);
  const { addTodoDone, addTodoError } = useSelector((state) => state.todo);

  // 로그인 X 로그인 페이지로 이동
  useEffect(() => {
    if (!me) {
      Router.replace('/');
    }
  }, [me]);

  useEffect(() => {
    if (addTodoError) {
      alert(addTodoError.errorMessage);
    }
  }, [addTodoError]);

  useEffect(() => {
    if (loadMyInfoError) {
      dispatch({
        type: LOGOUT_REQUEST,
      });
    }
  }, [loadMyInfoError]);

  useEffect(() => {
    if (addTodoDone) {
      Router.replace('/myTodoList');
    }
  }, [addTodoDone]);

  // modal 외부 클릭 시 닫힘
  const modalCloseHandler = ({ target }) => {
    if (!addMenu.current.contains(target)) {
      if (todo || detailContent) {
        if (confirm('입력한 작업내용이 존재합니다. 작업 등록을 취소하시겠습니까?')) {
          Router.replace('/myTodoList');
        }
      } else {
        Router.replace('/myTodoList');
      }
    }
  };

  // 외부 클릭시 modalCloseHandler 함수 호출
  useEffect(() => {
    window.addEventListener('click', modalCloseHandler);
    return () => {
      window.removeEventListener('click', modalCloseHandler);
    };
  });

  // 등록하기
  const onClickSubmit = (e) => {
    e.preventDefault();

    if (confirm('작업을 등록하시겠습니까?')) {
      dispatch({
        type: ADD_TODO_REQUEST,
        data: {
          todo: todo,
          detailContent: detailContent,
          done: 0,
        },
      });
    }
  };

  // 취소하기
  const onClickCancel = () => {
    if (confirm('작업등록을 취소하시겠습니까?')) {
      Router.replace('/myTodoList');
    }
  };

  return (
    <AppLayout>
      <Wrapper>
        <Form type="submit" onSubmit={onClickSubmit} ref={addMenu}>
          <PageTilte>작업 등록하기</PageTilte>
          <div>
            <SubTitle>작업 내용: </SubTitle>
            <Input type="text" placeholder="작업내용" value={todo} onChange={onChangeTodo} />
          </div>

          <div>
            <SubTitle>작업 상세내용: </SubTitle>
            <Textarea type="text" placeholder="작업 상세내용" value={detailContent} onChange={onChangeDetailContent} />
          </div>

          <BtnWrapper>
            <Button id="submit" type="submit">
              등록하기
            </Button>
            <Button id="cancel" type="button" onClick={onClickCancel}>
              취소
            </Button>
          </BtnWrapper>
        </Form>
      </Wrapper>
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

  store.dispatch(END);
  console.log('getServerSideProps end');
  await store.sagaTask.toPromise(); // store/configureStore.js > store.sagaTask
});

export default AddTodo;
