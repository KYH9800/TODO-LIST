import styled from 'styled-components';

export const SideMenuWrapper = styled.div`
  position: relative;
  background-color: #e6e1e1de;

  width: 305px;
  height: 100vh;

  a {
    display: block;
    text-decoration: none;
    color: #575656;
  }

  @media (max-width: 400px) {
    width: 230px;
  }
`;

export const ListItemWrapper = styled.div`
  position: absolute;
  top: 30px;
  right: 0;
  left: 0;
`;

export const ListItem = styled.div`
  width: 80%;
  margin: auto;

  font-size: 16px;
  font-weight: 400;

  text-align: start;
  padding: 7px 15px;
  letter-spacing: 1px;

  border-radius: 5px;

  :hover {
    background-color: #575656;
    color: #fff;
  }
`;
