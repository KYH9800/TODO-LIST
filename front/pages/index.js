import React, { useEffect, useCallback } from 'react';
import Router from 'next/router';

// styled-components
import {
  ServiceInformation,
  Form,
  LoginBox,
  Title,
  InputBox,
  Input,
  BtnWrapper,
  Button,
} from '../styles/pages/loginSt';

// custom hook
import useInput from '../hooks/useInput';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { loginRequestAction } from '../reducers/user';

// 로그인 페이지
const Login = () => {
  const dispatch = useDispatch();
  const [email, onChangeEmail] = useInput('admin@admin.com');
  const [password, onChangePassword] = useInput('a123123!');

  const { me, loginDone, loginError } = useSelector((state) => state.user);

  // 로그인 에러 발생 시 알림
  useEffect(() => {
    if (loginError) {
      alert(loginError);
      if (email && password) {
        dispatch({
          type: LOGOUT_REQUEST,
        }); //   dispatch(loginRequestAction({ email, password }));
      } else {
        alert(loginError);
        Router.push('/');
      }
    }
  }, [loginError]);

  // 로그인 완료 시 페이지 이동 /myTodoList
  useEffect(() => {
    if (loginDone) {
      Router.push('/myTodoList');
    }
  }, [loginDone]);

  // 로그인 상태 시 페이지 이동 /myTodoList
  useEffect(() => {
    if (me) {
      Router.replace('/myTodoList'); // 페이지가 없어짐
    }
  }, [me]);

  // 회워가입 페이지로 이동
  const onClickSignup = () => {
    Router.push('/signup');
  };

  // 로그인하기
  const onClickLogin = useCallback(
    (e) => {
      e.preventDefault();

      dispatch(loginRequestAction({ email, password }));
    },
    [email, password]
  );

  return (
    <Form onSubmit={onClickLogin}>
      <LoginBox>
        <Title>로그인</Title>

        <InputBox>
          <Input type="email" placeholder="이메일" value={email} onChange={onChangeEmail} />
          <Input type="password" placeholder="비밀번호" value={password} onChange={onChangePassword} />
        </InputBox>

        <BtnWrapper>
          <Button type="submit" id="submit">
            로그인
          </Button>
          <Button type="button" id="cancel" onClick={onClickSignup}>
            회원가입
          </Button>
        </BtnWrapper>

        <ServiceInformation>
          <p>안녕하세요. 시놀 관계자님.</p>
          <p>로그인 후 이용 부탁드립니다.</p>
          <p>버거로운 과정을 줄여드리고자</p>
          <p>의도적으로 Admin 계정을 통해 로그인이 가능하도록</p>
          <p>email과 password가 미리 입력되어 있습니다.</p>

          <p>해당 프로젝트는 회원가입 및 로그인 가능 또한 제공됩니다.</p>
          <p>원하신다면 회원가입 후 로그인을 진행하셔도 무관합니다.</p>
        </ServiceInformation>
      </LoginBox>
    </Form>
  );
};

export default Login;
