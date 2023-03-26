import React, { useCallback, useEffect } from 'react';
import Router from 'next/router';

import { Cookies } from 'react-cookie';
const cookies = new Cookies();

// AppLayout
import AppLayout from '../components/AppLayout';

//styled-components
import {
  UserInfoBox,
  Wrapper,
  Title,
  InputWrapper,
  SubTitle,
  Input,
  BtnWrapper,
  Button,
} from '../styles/pages/MyPageSt';

// custom hook
import useInput from '../hooks/useInput';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { LOAD_MY_INFO_REQUEST, UPDATE_MY_INFO_REQUEST, LOGOUT_REQUEST } from '../reducers/user';

// redux, server side rendering
import { END } from 'redux-saga';
import axios from 'axios';
import wrapper from '../store/configureStore';

const MyPage = () => {
  const dispatch = useDispatch();
  const { me, loadMyInfoError, updateMyInfoError, updateMyInfoDone } = useSelector((state) => state.user);

  const [nickname, onChangeNickname] = useInput(me?.user.nickname || '');
  const [password, onChangePassword] = useInput('');
  const [newPassword, onChangeNewPassword] = useInput('');
  const [newPasswordConfirm, onChangeNewPasswordConfirm] = useInput('');

  useEffect(() => {
    if (updateMyInfoDone) {
      Router.replace('/myPage');
    }
  }, [updateMyInfoDone]);

  useEffect(() => {
    if (updateMyInfoError) {
      alert(updateMyInfoError);
    }
  }, [updateMyInfoError]);

  useEffect(() => {
    if (!me) {
      Router.replace('/');
    }
  }, [me]);

  useEffect(() => {
    if (loadMyInfoError) {
      dispatch({
        type: LOGOUT_REQUEST,
      });
    }
  }, [loadMyInfoError]);

  // submit
  const onClickUpdateUserInfo = useCallback(
    (e) => {
      e.preventDefault();

      if (confirm('입력하신 정보로 수정하시겠습니까?')) {
        dispatch({
          type: UPDATE_MY_INFO_REQUEST,
          data: {
            nickname: nickname,
            password: password,
            newPassword: newPassword,
            newPasswordConfirm: newPasswordConfirm,
          },
        });
      }
    },
    [nickname, password, newPassword, newPasswordConfirm]
  );

  const logout = () => {
    dispatch({
      type: LOGOUT_REQUEST,
    });
  };

  return (
    <AppLayout me={me}>
      <UserInfoBox type="submit" onSubmit={onClickUpdateUserInfo}>
        <Wrapper>
          <Title>내 정보</Title>

          <InputWrapper>
            <div>
              <SubTitle>닉네임</SubTitle>
              <Input
                type="text"
                placeholder="변경할 닉네임을 입력하세요."
                value={nickname}
                onChange={onChangeNickname}
              />
            </div>
            <div>
              <SubTitle>현재 비밀번호</SubTitle>
              <Input type="password" placeholder="현재 비밀번호" value={password} onChange={onChangePassword} />
            </div>
            <div>
              <SubTitle>변경할 비밀번호</SubTitle>
              <Input type="password" placeholder="변경할 비밀번호" value={newPassword} onChange={onChangeNewPassword} />
            </div>
            <div>
              <SubTitle>변경할 비밀번호 확인</SubTitle>
              <Input
                type="password"
                placeholder="변경할 비밀번호 확인"
                value={newPasswordConfirm}
                onChange={onChangeNewPasswordConfirm}
              />
            </div>
          </InputWrapper>

          <BtnWrapper>
            <div>
              <Button type="submit" id="submit">
                내 정보 변경
              </Button>
            </div>
            <div>
              <Button type="button" id="logout" onClick={logout}>
                로그아웃
              </Button>
            </div>
          </BtnWrapper>
        </Wrapper>
      </UserInfoBox>
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

export default MyPage;
