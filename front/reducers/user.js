import produce from 'immer';
import { Cookies } from 'react-cookie';
const cookies = new Cookies();

/************************************************
 * 초기 state를 정의
 ************************************************/
export const initialState = {
  // 회원가입
  signupLoading: false,
  signupDone: false,
  signupError: null,

  // 로그인
  loginLoading: false,
  loginDone: false,
  loginError: null,

  // 내 정보 불러오기
  loadMyInfoLoading: false,
  loadMyInfoDone: false,
  loadMyInfoError: null,

  // 로그아웃
  logoutLoading: false,
  logoutDone: false,
  logoutError: null,

  // 내 정보 수정
  updateMyInfoLoading: false,
  updateMyInfoDone: false,
  updateMyInfoError: null,

  // 내 정보를 담는 state
  me: null,
};

/************************************************
 * action을 정의
 ************************************************/
// 회원가입
export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';

// 로그인
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

// 내 정보 불러오기
export const LOAD_MY_INFO_REQUEST = 'LOAD_MY_INFO_REQUEST';
export const LOAD_MY_INFO_SUCCESS = 'LOAD_MY_INFO_SUCCESS';
export const LOAD_MY_INFO_FAILURE = 'LOAD_MY_INFO_FAILURE';

// 로그아웃
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

// 내 정보 수정
export const UPDATE_MY_INFO_REQUEST = 'UPDATE_MY_INFO_REQUEST';
export const UPDATE_MY_INFO_SUCCESS = 'UPDATE_MY_INFO_SUCCESS';
export const UPDATE_MY_INFO_FAILURE = 'UPDATE_MY_INFO_FAILURE';

/************************************************
 * action creactor
 ************************************************/
// 로그인
export const loginRequestAction = (data) => ({
  type: LOGIN_REQUEST,
  data,
});

// 로그아웃
export const logoutRequestAction = () => ({
  type: LOGOUT_REQUEST,
});

/************************************************
 * reducer
 ************************************************/
const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    // console.log('action: ', action.error?.errorMessage);
    switch (action.type) {
      // 회원가입
      case SIGNUP_REQUEST:
        draft.signupLoading = true;
        draft.signupDone = false;
        draft.signupError = null;
        break;
      case SIGNUP_SUCCESS:
        draft.signupLoading = false;
        draft.signupDone = true;
        break;
      case SIGNUP_FAILURE:
        draft.signupLoading = false;
        draft.signupError = action.error?.errorMessage;
        break;

      // 로그인
      case LOGIN_REQUEST:
        draft.loginLoading = true;
        draft.loginDone = false;
        draft.loginError = null;
        break;
      case LOGIN_SUCCESS:
        draft.loginLoading = false;
        draft.loginDone = true;
        cookies.set('accessToken', action.data.token);
        cookies.set('refreshToken', action.data.refreshToken);

        localStorage.setItem('accessToken', action.data.token);
        localStorage.setItem('refreshToken', action.data.refreshToken);
        draft.me = action.data;
        break;
      case LOGIN_FAILURE:
        draft.loginLoading = false;
        draft.loginError = action.error?.errorMessage;
        break;

      // 내 정보 가져오기
      case LOAD_MY_INFO_REQUEST:
        draft.loadMyInfoLoading = true;
        draft.loadMyInfoDone = false;
        draft.loadMyInfoError = null;
        break;
      case LOAD_MY_INFO_SUCCESS:
        draft.loadMyInfoLoading = false;
        draft.loadMyInfoDone = true;
        draft.me = action.data;
        break;
      case LOAD_MY_INFO_FAILURE:
        draft.loadMyInfoLoading = false;
        draft.loadMyInfoError = action.error?.errorMessage;
        break;

      // 로그아웃
      case LOGOUT_REQUEST:
        /************************************************
         * 로그아웃 시 서버에서 cookie를 지우려했으나 지워지지 않음
         * 응답 header에 cookie를 지우지 못하는 문제로
         * 프론트단에서 작업 시행, 원인 파악중
         ************************************************/

        draft.logoutLoading = true;
        draft.logoutDone = false;
        draft.logoutError = null;
        break;
      case LOGOUT_SUCCESS:
        cookies.remove('accessToken');
        cookies.remove('refreshToken');
        draft.logoutLoading = false;
        draft.logoutDone = true;
        draft.loginDone = false;
        draft.me = null;
        break;
      case LOGOUT_FAILURE:
        draft.logoutLoading = false;
        draft.logoutError = action.error?.errorMessage;
        draft.me = null;
        break;

      // 내 정보 수정
      case UPDATE_MY_INFO_REQUEST:
        draft.updateMyInfoLoading = true;
        draft.updateMyInfoDone = false;
        draft.updateMyInfoError = null;
        break;
      case UPDATE_MY_INFO_SUCCESS:
        draft.updateMyInfoLoading = false;
        draft.updateMyInfoDone = true;
        break;
      case UPDATE_MY_INFO_FAILURE:
        draft.updateMyInfoLoading = false;
        draft.updateMyInfoError = action.error?.errorMessage;
        break;

      default:
        break;
    }
  });

export default reducer;
