import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

// antd
import { EllipsisOutlined, CloseOutlined } from '@ant-design/icons';

// styled-components
import {
  Header,
  DetailTilte,
  RightIconInHeader,
  DashList,
  ContentBox,
  Input,
  Textarea,
  BtnWrapper,
  Button,
} from '../../styles/pages/DetailPageSt';

// custom hooks
import useInput from '../../hooks/useInput';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { UPDATE_TODO_REQUEST, REMOVE_TODO_REQUEST } from '../../reducers/todo';

const DetailComponent = ({ detailTodoList, detailmodal }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [dash, setDash] = useState(false);
  const [updateState, setUpdateState] = useState(false);

  const [todo, onChangeTodo] = useInput(detailTodoList?.todo || '');
  const [detailContent, onChangeDetailContent] = useInput(detailTodoList?.detailContent || '');

  const { updateTodoDone, removeTodoDone } = useSelector((state) => state.todo);

  const dashMenu = useRef();

  useEffect(() => {
    if (updateTodoDone) {
      router.back();
    }
  }, [updateTodoDone]);

  useEffect(() => {
    if (removeTodoDone) {
      router.back();
    }
  }, [removeTodoDone]);

  // modal 외부 클릭 시 닫힘
  const modalCloseHandler = ({ target }) => {
    if (dash && !dashMenu.current.contains(target)) {
      setDash(false);
    }
    if (!detailmodal.current.contains(target)) {
      if (updateState) {
        onClickSetUpdateTodo(); // 수정하기 취소 함수 호출
      } else {
        !dash && router.back(); // detailmodal 밖을 클릭하고 dash가 false가 맞으면 뒤로가기
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

  // 목록으로
  const onClickBack = () => {
    router.back();
  };

  // 클릭 옵션
  const onClickdash = () => {
    setDash((prevState) => !prevState);
  };

  // 수정하기 상태 버튼
  const onClickSetUpdateTodo = () => {
    if (updateState) {
      if (confirm('수정을 취소하시겠습니까?')) {
        setUpdateState((prevState) => !prevState);
      }
    } else {
      setUpdateState((prevState) => !prevState);
    }
  };

  // 작업 완료 버튼
  const doneTodo = () => {
    if (confirm('작업을 완료하시겠습니까?')) {
      dispatch({
        type: UPDATE_TODO_REQUEST,
        data: {
          todo_id: detailTodoList.todo_id,
          todo: todo,
          detailContent: detailContent,
          done: 1,
        },
      });
    }
  };

  // 작업 완료 버튼
  const notDoneTodo = () => {
    if (confirm('작업을 완료하지 않은 상태로 되돌리겠습니까?')) {
      dispatch({
        type: UPDATE_TODO_REQUEST,
        data: {
          todo_id: detailTodoList.todo_id,
          todo: todo,
          detailContent: detailContent,
          done: 0,
        },
      });
    }
  };

  // 작업 삭제
  const deleteTodo = () => {
    if (confirm('작업을 삭제하겠습니까?')) {
      dispatch({
        type: REMOVE_TODO_REQUEST,
        data: {
          todo_id: detailTodoList.todo_id,
        },
      });
    }
  };

  // 작업 수정 취소하기
  const onClickCancelUpdate = () => {
    if (confirm('작업 수정을 취소하겠습니까?')) {
      setUpdateState(false);
      setDash(true);
    }
  };

  // 작업 수정하기
  const onClickSubmitUpdate = () => {
    if (confirm('작업을 수정하겠습니까?')) {
      dispatch({
        type: UPDATE_TODO_REQUEST,
        data: {
          todo_id: detailTodoList.todo_id,
          todo: todo,
          detailContent: detailContent,
          done: detailTodoList.done,
        },
      });
    }
  };

  return (
    <>
      <div>
        <Header>
          <div>
            <DetailTilte>관리함 / {detailTodoList?.done ? '완료목록' : '할일목록'}</DetailTilte>
          </div>
          <RightIconInHeader>
            <span>
              <EllipsisOutlined style={{ fontSize: '25px' }} onClick={onClickdash} ref={dashMenu} />
            </span>
            <span>
              <CloseOutlined style={{ fontSize: '22px' }} onClick={onClickBack} />
            </span>
          </RightIconInHeader>

          {dash ? (
            <DashList>
              {detailTodoList.done ? (
                <div onClick={notDoneTodo}>작업 미완료</div>
              ) : (
                <div onClick={doneTodo}>작업 완료</div>
              )}
              <div className="bottom-line"></div>
              {updateState ? (
                <div onClick={onClickSetUpdateTodo}>작업 수정 취소</div>
              ) : (
                <div onClick={onClickSetUpdateTodo}>작업 수정</div>
              )}

              <div className="bottom-line"></div>
              <div onClick={deleteTodo}>작업 삭제</div>
            </DashList>
          ) : null}
        </Header>
      </div>

      <ContentBox>
        <div className="created-at">
          <span>업로드일: </span> <span>{detailTodoList?.createdAt.slice(0, 10)}</span>
        </div>

        <div>
          <h5 className="sub-title">주요내용</h5>
        </div>

        <div>
          {updateState ? (
            <div>
              <Input type="text" placeholder="주요 내용" value={todo} onChange={onChangeTodo} />
            </div>
          ) : (
            <h3 className="todo-title">{detailTodoList?.todo}</h3>
          )}
        </div>

        <div>
          <h5 className="sub-title">상세내용</h5>
        </div>

        {updateState ? (
          <div>
            <Textarea type="text" placeholder="상세 내용" value={detailContent} onChange={onChangeDetailContent} />
          </div>
        ) : (
          <div className="todo-content">
            {detailTodoList?.detailContent ? (
              detailTodoList?.detailContent
            ) : (
              <h5 className="none">상세 계획이 존재하지 않습니다.</h5>
            )}
          </div>
        )}

        {updateState ? (
          <BtnWrapper>
            <Button id="submit" onClick={onClickSubmitUpdate}>
              수정하기
            </Button>
            <Button id="cancel" onClick={onClickCancelUpdate}>
              취소
            </Button>
          </BtnWrapper>
        ) : null}
      </ContentBox>
    </>
  );
};

export default DetailComponent;
