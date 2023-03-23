import styled from 'styled-components';
// antd
import { MenuOutlined, HomeOutlined } from '@ant-design/icons';
import { Space } from 'antd';

export const AppLayoutWrapper = styled.div`
  width: 100%;
`;

export const TopMenubar = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;

  padding: 0 20px;

  background-color: #000000bf;

  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 1200px) {
    padding: 0;
  }
`;

export const Web = styled.div`
  display: block;

  @media (max-width: 1200px) {
    display: none;
  }
`;

export const Mobile = styled.div`
  display: none;

  @media (max-width: 1200px) {
    display: block;
  }
`;

export const CustomSpace = styled(Space)`
  position: relative;

  .ant-avatar {
    cursor: pointer;
  }
`;

export const UserProfileLists = styled.div`
  position: absolute;
  top: 117.8%;
  right: 32%;

  background-color: #e6e1e1;
  border-radius: 5px;

  width: 150px;
`;

export const ListsItem = styled.div`
  #myInfo {
    border-radius: 5px 5px 0px 0px;
  }

  #logout {
    border-radius: 0px 0px 5px 5px;
  }

  .bottom-line {
    padding: 0;
    border-bottom: 1px solid #c4c4c4;
  }

  div {
    cursor: pointer;
    padding: 7px 7px;

    color: #575656;
    font-size: 15px;
    letter-spacing: 1px;

    :hover {
      background-color: #575656;
      color: #fff;
    }
  }
`;

export const CustomMenuOutlined = styled(MenuOutlined)`
  cursor: pointer;
  font-size: 18px;
  color: #fff;

  padding: 12px 11px;
`;

export const CustomHomeOutlined = styled(HomeOutlined)`
  cursor: pointer;
  font-size: 18px;
  color: #fff;

  padding: 12px 11px;
`;

export const SideMenuList = styled.div`
  position: absolute;
  left: 0;
`;

export const Main = styled.div`
  /* background-color: gray; */
  margin-left: 30%;
  /* margin: auto; */
  width: 700px;

  @media (max-width: 1200px) {
    width: 60%;
    margin: auto;
  }

  @media (max-width: 770px) {
    width: 90%;
    margin: auto;
  }
`;

export const EmptyBlock = styled.div`
  height: 42px;
`;
