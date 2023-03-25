import React, { useEffect, useState } from 'react';
import Router from 'next/router';

// styled-components
import {
  Form,
  PositionWrapper,
  SignupBox,
  Title,
  SignupInputBox,
  Input,
  Warning,
  BtnWrapper,
  Button,
} from '../styles/pages/loginSt';

// custom hook
import useInput from '../hooks/useInput';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { SIGNUP_REQUEST, LOGIN_REQUEST, LOAD_MY_INFO_REQUEST } from '../reducers/user';

// 회원가입 페이지
const Signup = () => {
  const dispatch = useDispatch();
  const [email, onChangeEmail] = useInput('');
  const [nickname, onChangeNickname] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [passwordConfirm, onChangePasswordConfirm] = useInput('');

  const { signupDone, signupError, me } = useSelector((state) => state.user);

  useEffect(() => {
    if (me) {
      Router.replace('/'); // 페이지가 없어짐
    }
  }, [me]);

  useEffect(() => {
    if (signupDone) {
      // 회원가입 완료 시 자동로그인
      dispatch({
        type: LOGIN_REQUEST,
        data: {
          email: email,
          password: password,
        },
      });

      Router.push('/');
    }
  }, [signupDone]);

  useEffect(() => {
    if (signupError) {
      alert(signupError);
    }
  }, [signupError]);

  const onClickCancel = () => {
    if (confirm('회원가입을 취소하시겠습니까?')) Router.push('/');
  };

  const onClickLogin = (e) => {
    e.preventDefault();

    if (!email || !password || !passwordConfirm || !nickname) {
      alert('입력란에 빈 곳이 있습니다. 확인해주세요.');
    }

    dispatch({
      type: SIGNUP_REQUEST,
      data: {
        email: email,
        nickname: nickname,
        password: password,
        passwordConfirm: passwordConfirm,
        authority: '2',
      },
    });
  };

  return (
    <Form onSubmit={onClickLogin}>
      <SignupBox>
        <PositionWrapper>
          <Title>회원가입</Title>

          <SignupInputBox>
            <div id="title">
              <span>이메일</span>
            </div>
            <Input type="email" placeholder="이메일" value={email} onChange={onChangeEmail} />
            <div id="title">
              <span>닉네임</span>
            </div>
            <Input type="text" placeholder="닉네임" value={nickname} onChange={onChangeNickname} />
            <div id="title">
              <span>비밀번호</span>
            </div>
            <Input type="password" placeholder="비밀번호" value={password} onChange={onChangePassword} />
            <div id="title">
              <span>비밀번호 확인</span>
            </div>
            <Input
              type="password"
              placeholder="비밀번호 확인"
              value={passwordConfirm}
              onChange={onChangePasswordConfirm}
            />
          </SignupInputBox>

          {signupError ? (
            <Warning>
              <p>{signupError}</p>
            </Warning>
          ) : null}

          <BtnWrapper>
            <Button type="submit" id="submit">
              회원가입
            </Button>
            <Button type="button" id="cancel" onClick={onClickCancel}>
              취소
            </Button>
          </BtnWrapper>
        </PositionWrapper>
      </SignupBox>
    </Form>
  );
};

export default Signup;
