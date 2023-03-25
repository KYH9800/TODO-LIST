const { User } = require('../../models');

const LoginRepository = require('../repositories/login.repository');
const loginRepository = new LoginRepository(User);

const { CustomError } = require('../../utils/Error');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const user_login = async (email, password) => {
  if (!email || !password) {
    throw new CustomError('이메일 및 비밀번호를 확인해주세요.', 412);
  }

  const user = await loginRepository.findUser(email);

  const passwordCheck = await bcrypt.compare(password, user.password);

  if (!user || !passwordCheck) {
    throw new CustomError('이메일 및 비밀번호가 일치하지 않습니다.', 400);
  }

  const accessToken = jwt.sign(
    {
      user_id: user.user_id,
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: '1h', // 5s
    }
  );

  const refreshToken = jwt.sign(
    {
      user_id: user.user_id,
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: '1d', // 10s
    }
  );

  return { accessToken, refreshToken };
};

module.exports = {
  user_login,
};
