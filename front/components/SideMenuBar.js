import React, { useEffect } from 'react';
import Link from 'next/link';

// styled-components
import { SideMenuWrapper, ListItemWrapper, ListItem } from '../styles/SideMenuBarSt';

const SideMenuBar = () => {
  return (
    <SideMenuWrapper>
      <ListItemWrapper>
        <Link href="/addTodo">
          <ListItem>일정추가</ListItem>
        </Link>
        <br />
        <Link href="/myTodoList">
          <ListItem>할일목록</ListItem>
        </Link>
        <Link href="/doneTodoList">
          <ListItem>완료목록</ListItem>
        </Link>
      </ListItemWrapper>
    </SideMenuWrapper>
  );
};

export default SideMenuBar;
