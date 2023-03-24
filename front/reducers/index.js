import { combineReducers } from 'redux'; // 여러 리듀서들을 하나로 합쳐준다.
import { HYDRATE } from 'next-redux-wrapper';

import todo from './todo';
// import user from './user';

// HYDRATE가 동작할 때 initStates들이 index user todo 자체를 덮어씌울 수 있도록 구조를 작성
const rootReducer = (state, action) => {
  switch (action.type) {
    case HYDRATE:
      console.log('HYDRATE', action);
      return action.payload; // return { ...state, ...action.payload };
    default: {
      const combineReducer = combineReducers({
        todo,
        // user,
      });
      return combineReducer(state, action);
    }
  }
};

export default rootReducer; // _app.js에서 reducer로 사용된다!
