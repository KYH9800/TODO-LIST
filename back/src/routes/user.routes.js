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

// 회원가입
router.post('/signup', isNotLoggedIn, signupController.signup);

// 로그인
router.post('/login', isNotLoggedIn, loginController.login);

// 로그아웃
router.post('/logout', isLoggedInForLogout, loginController.logout);

// 내 정보 조회
router.get('/', isLoggedIn, userController.findUser);

// 내 정보 수정(비밀번호 변경)
router.patch('/', isLoggedIn, userController.updateUserInfo);

module.exports = router;
