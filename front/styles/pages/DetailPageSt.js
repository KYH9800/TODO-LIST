import styled from 'styled-components';

export const Modal = styled.div`
  position: fixed;
  top: 42px;
  left: 0;
  right: 0;

  background-color: #000000ba;
  width: 100%;
  height: 100vh;
`;

export const DetailBox = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* top: 10%; */
  /* left: 0; */
  /* right: 0; */

  margin: auto;

  width: 35%;
  /* height: 70vh; */

  background-color: #fff;

  border-radius: 3px;

  @media (max-width: 1200px) {
    width: 50%;
  }

  @media (max-width: 770px) {
    width: 90%;
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 7px;

  padding: 4px 10px;

  border-bottom: 1px solid black;

  span {
    cursor: pointer;
  }
`;

export const DetailTilte = styled.h3`
  margin: 0;

  font-size: 14px;
  font-weight: 400;
`;

export const RightIconInHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
`;

export const DashList = styled.div`
  z-index: 999;

  position: absolute;
  top: 37px;
  right: 41px;

  @media (max-width: 770px) {
    right: 0px;
  }

  background-color: #e4e4e4;
  border-radius: 5px;

  width: 200px;

  .bottom-line {
    padding: 0;
    border-bottom: 1px solid #c4c4c4;
    width: 100%;
  }

  div {
    cursor: pointer;
    width: 180px;

    margin: 5px auto;
    padding: 5px 5px;

    text-align: center;
    border-radius: 3px;
  }

  div:hover {
    background-color: gray;
  }
`;

export const ContentBox = styled.div`
  position: relative;
  margin: 20px;

  .todo-title {
    font-weight: 500;
    margin: 0 0 20px 5px;
  }

  .sub-title {
    margin: 0;
    font-weight: 400;
    color: #6b6a6a;
  }

  .todo-content {
    font-weight: 400;
    font-size: 15px;

    margin-left: 5px;

    height: 350px;
  }

  .created-at {
    margin-top: 10px;
    margin-right: 5px;
    font-size: 14px;

    text-align: end;
  }

  .none {
    font-size: 13px;
    font-weight: 400;
    color: #6b6a6a;
  }
`;

// 수정 시 input
export const Input = styled.input`
  font-size: 15x;

  width: 98%;
  height: 33px;

  padding: 0 5px;
  margin: 0 0 20px 5px;

  outline: none;

  border: 0;
`;

// 수정 시 textarea
export const Textarea = styled.textarea`
  width: 98%;
  height: 300px;

  padding: 7px 5px;

  border: 0;
  outline: none;

  @media (max-width: 450px) {
    height: 300px;
  }

  @media (max-width: 770px) {
    height: 260px;
  }
`;

// 수정 시 버튼
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
    /* margin-top: 10px; */
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
