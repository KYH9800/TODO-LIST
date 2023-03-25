import styled from 'styled-components';

export const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;

  background-color: #00000073;

  height: 100vh;
  width: 100%;
`;

export const Form = styled.form`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  flex-direction: column;
  gap: 3px;

  background-color: #ebedf3;

  padding: 15px;

  width: 50%;

  border-radius: 5px;

  @media (max-width: 1200px) {
    width: 70%;
  }

  @media (max-width: 770px) {
    width: 80%;
  }

  /* @media (max-width: 450px) {
    margin: 20% auto;
  } */
`;

export const PageTilte = styled.h2`
  font-size: 20px;
  font-weight: 600;

  margin: 10px 0 30px 0;
`;

export const SubTitle = styled.div`
  font-size: 16px;

  margin-bottom: 5px;
`;

export const Input = styled.input`
  font-size: 15x;

  width: 98%;
  height: 33px;

  padding: 0 5px;
  margin-bottom: 20px;

  outline: none;

  border: 0;
`;

export const Textarea = styled.textarea`
  width: 98%;
  height: 200px;

  padding: 7px 5px;

  border: 0;
  outline: none;

  @media (max-width: 450px) {
    height: 330px;
  }

  @media (max-width: 770px) {
    height: 300px;
  }
`;

export const BtnWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 3px;

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

  @media (max-width: 450px) {
    flex-direction: column;
    margin-top: 10px;
  }
`;

export const Button = styled.button`
  cursor: pointer;
  width: 90px;
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
