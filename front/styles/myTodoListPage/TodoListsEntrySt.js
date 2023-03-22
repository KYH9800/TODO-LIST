import styled from 'styled-components';
import Link from 'next/link';

export const TodoBox = styled.div`
  display: flex;

  background-color: #f4f4f4;

  border: 1px solid #d3cdcd;
  border-radius: 5px;

  margin: 5px 0;

  :hover {
    background-color: #dedede;
  }
`;

export const FrontLine = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;

  margin: 0 7px;

  @media (max-width: 500px) {
    font-size: 14px;
  }
`;

export const CustomLink = styled(Link)`
  display: block;
  width: 100%;

  text-decoration: none;
  color: black;

  padding: 8px 0px 23px 0px;
`;

export const CheckInput = styled.input`
  margin-top: 8px;
  margin-left: 7px;

  width: 20px;
  height: 20px;

  cursor: pointer;
  border: 1px solid #d3cdcd;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: #fff;
  border-radius: 4px;
  height: 16px;
  outline: 0;
  width: 16px;

  ::after {
    border: solid #fff;
    border-width: 0 2px 2px 0;
    content: '';
    display: none;
    height: 40%;
    left: 40%;
    position: relative;
    top: 20%;
    transform: rotate(45deg);
    width: 15%;
  }

  :checked {
    background: #505bf0;
  }

  :checked::after {
    display: block;
  }
`;

export const DateLine = styled.div`
  margin: 0 15px;
`;

export const DetailTodo = styled.div`
  margin: 3px 7px 0 7px;

  font-size: 14px;
  font-weight: 400;
  color: #5a5656;

  @media (max-width: 500px) {
    font-size: 12px;
  }
`;
