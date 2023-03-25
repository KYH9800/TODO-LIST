import React, { useEffect } from 'react';
import Router from 'next/router';

// styled-components
import {
  TodoBox,
  FrontLine,
  CustomLink,
  CheckInput,
  TodoNum,
  DateLine,
  DetailTodo,
} from '../../styles/components/TodoListsEntrySt';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { UPDATE_TODO_REQUEST } from '../../reducers/todo';

const TodoListsEntry = ({ data, num }) => {
  const dispatch = useDispatch();
  const { updateTodoDone } = useSelector((state) => state.todo);

  // 작업상태 업데이트 시 페이지 새로고침 또는 해당코드 주석처리 해보기
  useEffect(() => {
    if (updateTodoDone) {
      Router.reload();
    }
  }, [updateTodoDone]);

  // 작업완료 및 미완료 버튼 활성화하기 / update done
  const onClickUpdateDone = () => {
    if (data.done === 0) {
      if (confirm('작업을 완료하시겠습니까?')) {
        dispatch({
          type: UPDATE_TODO_REQUEST,
          data: {
            todo_id: data.todo_id,
            todo: data.todo,
            detailContent: data.detailContent,
            done: data.done === 0 ? 1 : 0,
          },
        });
      }
    } else {
      if (confirm('작업을 완료하지 않은 상태로 하시겠습니까?')) {
        dispatch({
          type: UPDATE_TODO_REQUEST,
          data: {
            todo_id: data.todo_id,
            todo: data.todo,
            detailContent: data.detailContent,
            done: data.done === 0 ? 1 : 0,
          },
        });
      }
    }
  };

  return (
    <TodoBox>
      <CheckInput type="checkbox" onClick={onClickUpdateDone} />
      <TodoNum>{num}.</TodoNum>

      <CustomLink href={`/${data.done === 0 ? 'myTodoList' : 'doneTodoList'}/${data.todo_id}`}>
        <FrontLine>
          <div>
            <div>{data.todo} </div>
          </div>
          <DateLine>{data.createdAt.slice(0, 10)} </DateLine>
        </FrontLine>

        <DetailTodo>{data.detailContent}</DetailTodo>
      </CustomLink>
    </TodoBox>
  );
};

export default TodoListsEntry;
