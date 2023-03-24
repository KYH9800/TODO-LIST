import React, { useState, useEffect, useRef } from 'react';
import Router from 'next/router';

// styled-components
import { Wrapper, Form, PageTilte, SubTitle, Input, Textarea, BtnWrapper, Button } from '../styles/pages/addTodoSt';

// AppLayout
import AppLayout from '../components/AppLayout';

// custom hooks
import useInput from '../hooks/useInput';

/* TODO LIST 생성 */
const AddTodo = () => {
  const addMenu = useRef();

  const [todo, onChangeTodo] = useInput('');
  const [detailContent, onChangeDetailContent] = useInput('');

  // modal 외부 클릭 시 닫힘
  const modalCloseHandler = ({ target }) => {
    if (!addMenu.current.contains(target)) {
      if (confirm('작업 등록을 취소하시겠습니까?')) {
        Router.back();
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
      console.log('submit');
      console.log('todo: ', todo);
      console.log('detailContent: ', detailContent);
      console.log('done: ', { done: 0 });
      // dispatch { todo: todo, detailContent: detailContent, done: 0 }
    }
  };

  // 취소하기
  const onClickCancel = () => {
    if (confirm('작업등록을 취소하시겠습니까?')) {
      Router.back();
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

export default AddTodo;
