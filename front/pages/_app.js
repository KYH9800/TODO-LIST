import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
// redux
// import wrapper from '../store/configureStore';
// global.css
import '../styles/global.css';

const TodoList = ({ Component, pageProps }) => (
  <>
    <Head>
      <meta charSet="utf-8" />
      <title>TODO-LIST</title>
    </Head>

    <Component {...pageProps} />
  </>
);

TodoList.propTypes = {
  Component: PropTypes.func.isRequired,
};

// export default wrapper.withRedux(TodoList);
export default TodoList;
