import styled from 'styled-components';

export const UserInfoBox = styled.form`
  background-color: #efefef;

  margin: 20% auto;
  padding: 20px;

  height: 55vh;

  @media (max-width: 1200px) {
    top: 10%;
  }

  @media (max-width: 545px) {
    height: 43vh;
  }
`;

export const Wrapper = styled.div`
  margin: 0 auto;
`;

export const Title = styled.h3`
  display: block;
  margin-bottom: 30px;
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;

  width: 100%;
  margin: 30px auto;
`;

export const SubTitle = styled.div`
  font-size: 14px;
  font-family: 500;
`;

export const Input = styled.input`
  font-size: 15x;

  width: 97%;
  height: 33px;

  outline: none;
  padding: 0 5px;

  border: 1px solid #bababa;
  border-radius: 3px;
`;

export const BtnWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3px;

  #submit {
    background-color: #4949ff;
    color: #fff;

    :hover {
      background-color: #0000fd;
    }
  }

  #logout {
    background-color: #bababa;
    color: #222;
    font-weight: bold;

    :hover {
      background-color: #ababab;
    }
  }

  @media (max-width: 545px) {
    flex-direction: column;
  }
`;

export const Button = styled.button`
  cursor: pointer;
  width: 200px;
  height: 30px;

  border: 0;
  border-radius: 3px;
`;
