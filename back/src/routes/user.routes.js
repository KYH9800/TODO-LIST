const express = require('express');
const router = express.Router();

const SignupController = require('../controllers/signup.controller');
const signupController = new SignupController();

const LoginController = require('../controllers/login.controller');
const loginController = new LoginController();

const UserController = require('../controllers/user.controller');
const userController = new UserController();

const { isNotLoggedIn } = require('../../middlewares/isNotLoggedIn'); // 로그인되지 않은 사용자만 접근이 가능합니다.
const { isLoggedIn, isLoggedInForLogout } = require('../../middlewares/isLoggedIn'); // 로그인된 사용자만 접근이 가능합니다.

router
  .post('/signup', signupController.signup) // 회원가입
  .post('/login', loginController.login) // 로그인
  .post('/logout', loginController.logout) // 로그아웃
  .get('/', userController.findUser) // 내 정보 조회
  .patch('/', userController.updateUserInfo); // 내 정보 수정(비밀번호 변경)

// .post('/signup', isNotLoggedIn, signupController.signup) // 회원가입
// .post('/login', isNotLoggedIn, loginController.login) // 로그인
// .post('/logout', isLoggedInForLogout, loginController.logout) // 로그아웃
// .get('/', isLoggedIn, userController.findUser) // 내 정보 조회
// .patch('/', isLoggedIn, userController.updateUserInfo); // 내 정보 수정(비밀번호 변경)

module.exports = router;
