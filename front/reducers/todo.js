import produce from 'immer';

export const initialState = {
  mainTodos: [], // 메인 TODOS
  singleTodo: null, // 단일 TODOS

  // 이미지 url (추가 예정)
  imagePaths: [],

  // 가져오려는 시도 (무한 스크롤)
  hasMoreTodos: true,

  // :TODO 추가
  addTodoLoading: false,
  addTodoDone: false,
  addTodoError: null,

  // 전체 TODO 목록
  loadTodosLoading: false,
  loadTodosDone: false,
  loadTodosError: null,

  // 단일 TODO 목록
  loadTodoLoading: false,
  loadTodoDone: false,
  loadTodoError: null,

  // :TODO 수정
  updateTodoLoading: false,
  updateTodoDone: false,
  updateTodoError: null,

  // :TODO 삭제
  removeTodoLoading: false,
  removeTodoDone: false,
  removeTodoError: null,

  // 이미지 추가 (추가 예정)
  uploadImagesLoading: false,
  uploadImagesDone: false,
  uploadImagesError: null,
};

// :TODO 추가
export const ADD_TODO_REQUEST = 'ADD_TODO_REQUEST';
export const ADD_TODO_SUCCESS = 'ADD_TODO_SUCCESS';
export const ADD_TODO_FAILURE = 'ADD_TODO_FAILURE';

// 전체 TODO 목록 불러오기
export const LOAD_TODOS_REQUEST = 'LOAD_TODOS_REQUEST';
export const LOAD_TODOS_SUCCESS = 'LOAD_TODOS_SUCCESS';
export const LOAD_TODOS_FAILURE = 'LOAD_TODOS_FAILURE';

// 단일 TODO 목록 불러오기
export const LOAD_TODO_REQUEST = 'LOAD_TODO_REQUEST';
export const LOAD_TODO_SUCCESS = 'LOAD_TODO_SUCCESS';
export const LOAD_TODO_FAILURE = 'LOAD_TODO_FAILURE';

// :TODO 수정
export const UPDATE_TODO_REQUEST = 'UPDATE_TODO_REQUEST';
export const UPDATE_TODO_SUCCESS = 'UPDATE_TODO_SUCCESS';
export const UPDATE_TODO_FAILURE = 'UPDATE_TODO_FAILURE';

// :TODO 삭제
export const REMOVE_TODO_REQUEST = 'REMOVE_TODO_REQUEST';
export const REMOVE_TODO_SUCCESS = 'REMOVE_TODO_SUCCESS';
export const REMOVE_TODO_FAILURE = 'REMOVE_TODO_FAILURE';

// 이미지 추가 (추가 예정)
export const UPLOAD_IMAGES_REQUEST = 'UPLOAD_IMAGES_REQUEST';
export const UPLOAD_IMAGES_SUCCESS = 'UPLOAD_IMAGES_SUCCESS';
export const UPLOAD_IMAGES_FAILURE = 'UPLOAD_IMAGES_FAILURE';

// 이미지 삭제 (추가 예정)
export const REMOVE_IMAGE = 'REMOVE_IMAGE'; // 이미지 업로드 삭제

// reducer
const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      // :TODO 추가
      case ADD_TODO_REQUEST:
        draft.addTodoLoading = true;
        draft.addTodoDone = false;
        draft.addTodoError = null;
        break;
      case ADD_TODO_SUCCESS:
        draft.addTodoLoading = false;
        draft.addTodoDone = true;
        draft.mainTodos = draft.mainTodos.concat(action.data);
        // singPosts의 Comments 동기화 해야됨
        break;
      case ADD_TODO_FAILURE:
        draft.addTodoLoading = false;
        draft.addTodoError = action.error;
        break;

      // 전체 TODOS 조회
      case LOAD_TODOS_REQUEST:
        draft.loadTodosLoading = true;
        draft.loadTodosDone = false;
        draft.loadTodosError = null;
        break;
      case LOAD_TODOS_SUCCESS:
        draft.loadTodosLoading = false;
        draft.loadTodosDone = true;
        draft.mainTodos = draft.mainTodos.concat(action.data);
        draft.hasMoreTodos = action.data.length === 10; // 10개의 게시글을 불러온다
        break;
      case LOAD_TODOS_FAILURE:
        draft.loadTodosLoading = false;
        draft.loadTodosError = action.error;
        break;

      // 단일 TODO 상세조회
      case LOAD_TODO_REQUEST:
        draft.loadTodoLoading = true;
        draft.loadTodoDone = false;
        draft.loadTodoError = null;
        break;
      case LOAD_TODO_SUCCESS:
        draft.loadTodoLoading = false;
        draft.loadTodoDone = true;
        draft.singleTodo = action.data;
        break;
      case LOAD_TODO_FAILURE:
        draft.loadTodoLoading = false;
        draft.loadTodoError = action.error;
        break;

      // :TODO 수정
      case UPDATE_TODO_REQUEST:
        draft.updateTodoLoading = true;
        draft.updateTodoDone = false;
        draft.updateTodoError = null;
        break;
      case UPDATE_TODO_SUCCESS:
        draft.updateTodoLoading = false;
        draft.updateTodoDone = true;
        console.log(action.data);
        draft.mainTodos = draft.mainTodos.concat(action.data);
        break;
      case UPDATE_TODO_FAILURE:
        draft.updateTodoLoading = false;
        draft.updateTodoError = action.error;
        break;

      // :TODO 삭제
      case REMOVE_TODO_REQUEST:
        draft.removeTodoLoading = true;
        draft.removeTodoDone = false;
        draft.removeTodoError = null;
        break;
      case REMOVE_TODO_SUCCESS:
        draft.removeTodoLoading = false;
        draft.removeTodoDone = true;
        draft.mainTodos = draft.mainTodos.filter((v) => v.id !== action.data);
        break;
      case REMOVE_TODO_FAILURE:
        draft.removeTodoLoading = false;
        draft.removeTodoError = action.error;
        break;

      // 이미지 업로드 (추가 예정)
      case UPLOAD_IMAGES_REQUEST:
        draft.uploadImagesLoading = true;
        draft.uploadImagesDone = false;
        draft.uploadImagesError = null;
        break;
      case UPLOAD_IMAGES_SUCCESS:
        draft.imagePaths = action.data;
        draft.uploadImagesLoading = false;
        draft.uploadImagesDone = true;
        break;
      case UPLOAD_IMAGES_FAILURE:
        draft.uploadImagesLoading = false;
        draft.uploadImagesError = action.error;
        break;

      // 이미지 삭제 (추가 예정)
      case REMOVE_IMAGE:
        draft.imagePaths = draft.imagePaths.filter((v, i) => i !== action.data);
        break;
      default:
        break;
    }
  });

export default reducer;
