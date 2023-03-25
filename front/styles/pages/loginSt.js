import styled from 'styled-components';

// 로그인
export const ServiceInformation = styled.div`
  margin-top: 10%;
  margin-bottom: 20%;

  p {
    text-align: center;
    font-size: 13px;
    font-weight: 500;
  }
`;

export const Form = styled.form`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;

  background-color: #000000ba;
  width: 100%;
  height: 100vh;
`;

export const LoginBox = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  margin: auto;

  width: 35%;

  background-color: #fff;

  border-radius: 3px;

  @media (max-width: 1200px) {
    width: 50%;
  }

  @media (max-width: 770px) {
    width: 70%;
  }

  @media (max-width: 450px) {
    width: 100%;
    height: 60vh;
  }
`;

export const Title = styled.h3`
  text-align: center;
  font-size: 23px;

  margin: 20px 0;
`;

export const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;

  margin: 10px 0;
`;

export const Input = styled.input`
  font-size: 15x;

  width: 60%;
  height: 33px;

  padding: 0 5px;

  outline: none;

  @media (max-width: 770px) {
    width: 60%;
  }

  @media (max-width: 450px) {
    width: 80%;
  }
`;

export const BtnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: end;
  gap: 3px;

  margin-top: 35px;
  margin-bottom: 30px;

  #submit {
    background-color: #4343ff;
    color: #fff;
  }
  #submit:hover {
    background-color: #0000ff;
  }

  #cancel {
    background-color: #808080;
    color: #fff;
  }
  #cancel:hover {
    background-color: #625f5f;
  }
`;

export const Button = styled.button`
  cursor: pointer;
  width: 230px;
  height: 30px;

  font-size: 14px;
  font-weight: 600;

  border: 1px solid #dedbdb;
  border-radius: 5px;

  @media (max-width: 450px) {
    width: 90%;
    height: 35px;
  }
`;

// 회원가입

export const PositionWrapper = styled.div`
  position: relative;
`;

export const SignupBox = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  margin: auto;

  width: 35%;

  background-color: #fff;

  border-radius: 3px;

  @media (max-width: 1200px) {
    width: 50%;
  }

  @media (max-width: 770px) {
    width: 70%;
  }

  @media (max-width: 450px) {
    width: 100%;
    height: 55vh;
  }
`;

export const SignupInputBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;

  margin: 10px 0;

  #title {
    text-align: start;

    font-size: 14px;
    color: #565656;

    width: 62%;
    margin-top: 3px;
  }

  @media (max-width: 450px) {
    #title {
      width: 82%;
    }
  }
`;

export const Warning = styled.span`
  position: fixed;
  right: 0;
  left: 0;

  text-align: center;

  font-size: 14px;
  font-weight: 500;
  color: red;

  p {
    margin: 0;
  }
`;
