import React, { useRef, useState, useEffect } from 'react';
import Router from 'next/router';
import Link from 'next/link';

// antd
import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';

// styled-components
import {
  AppLayoutWrapper,
  TopMenubar,
  Web,
  Mobile,
  CustomSpace,
  Span,
  UserProfileLists,
  ListsItem,
  CustomMenuOutlined,
  CustomHomeOutlined,
  SideMenuList,
  Main,
  EmptyBlock,
} from '../styles/components/AppLayoutSt';

// components
import SideMenuBar from './SideMenuBar';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { LOGOUT_REQUEST } from '../reducers/user';

// app layout
const AppLayout = ({ children }) => {
  const dispatch = useDispatch();
  const [menubar, setMenubar] = useState(false);
  const [myProfile, setMyProfile] = useState(false);

  const userMenu = useRef();
  const sideMenu = useRef();

  const { me } = useSelector((state) => state.user);

  // 내 정보가 없으면 로그인 화면으로 이동
  useEffect(() => {
    if (!me) {
      Router.replace('/');
    }
  }, [me]);

  // home 버튼
  const onClickHome = () => {
    Router.push('/myTodoList');
  };

  // 사이드 메뉴바
  const onClickMenubar = () => {
    setMenubar((prevState) => !prevState);
  };

  // 내 프로필 아이콘 클릭
  const onClickMyProfile = () => {
    setMyProfile((prevState) => !prevState);
  };

  // 로그아웃
  const logout = () => {
    dispatch({
      type: LOGOUT_REQUEST,
    });
  };

  // modal 외부 클릭 시 닫힘
  const modalCloseHandler = ({ target }) => {
    if (myProfile && !userMenu.current.contains(target)) setMyProfile(false);
    if (menubar && !sideMenu.current.contains(target)) setMenubar(false);
  };

  // 외부 클릭시 modalCloseHandler 함수 호출
  useEffect(() => {
    window.addEventListener('click', modalCloseHandler);
    return () => {
      window.removeEventListener('click', modalCloseHandler);
    };
  });

  return (
    <div>
      <AppLayoutWrapper>
        <TopMenubar>
          <Web>
            <div>
              <CustomHomeOutlined onClick={onClickHome} />
            </div>
            <SideMenuList>
              <SideMenuBar />
            </SideMenuList>
          </Web>

          <Mobile>
            <div>
              <CustomMenuOutlined onClick={onClickMenubar} ref={sideMenu} />
              <CustomHomeOutlined onClick={onClickHome} />
            </div>
            <SideMenuList>
              <div>{menubar ? <SideMenuBar /> : null}</div>
            </SideMenuList>
          </Mobile>

          <CustomSpace wrap size={16}>
            <Span>
              <span id="user-nickname">{me?.user?.nickname}</span>님 환영합니다
            </Span>
            <Avatar icon={<UserOutlined />} onClick={onClickMyProfile} ref={userMenu} />
            <UserProfileLists>
              {myProfile ? (
                <ListsItem>
                  <Link href="/myPage">
                    <div id="myInfo">내 정보</div>
                  </Link>

                  <div className="bottom-line"></div>

                  <div id="logout" onClick={logout}>
                    로그아웃
                  </div>
                </ListsItem>
              ) : null}
            </UserProfileLists>
          </CustomSpace>
        </TopMenubar>

        <EmptyBlock />

        <Main>{children}</Main>
      </AppLayoutWrapper>
    </div>
  );
};

export default AppLayout;
