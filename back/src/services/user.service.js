const { User, Todo } = require('../../models');

const UserRepository = require('../repositories/user.repository');
const userRepository = new UserRepository(User, Todo);
// custom error
const { CustomError } = require('../../utils/Error');
// bcrypt
const bcrypt = require('bcrypt');

// 내 정보 불러오기
const findUser = async (user_id) => {
  try {
    console.log('UserService user_id: ', user_id);

    if (!user_id) {
      throw new CustomError('사용자 정보가 없습니다. 로그인을 다시 시도해주세요', 412);
    }

    const user = await userRepository.findUser(user_id);

    return user;
  } catch (error) {
    console.log('error: ', error);
  }
};

// 내 정보 수정, 비밀번호 변경
const updateUserInfo = async (user_id, nickname, password, newPassword, newPasswordConfirm) => {
  if (!user_id) {
    throw new CustomError('사용자 정보가 없습니다. 로그인을 다시 시도해주세요', 412);
  }

  if (password) {
    const userPassword = await userRepository.findUserPassword(user_id);

    console.log('password: ', password);
    console.log('userPassword.password: ', userPassword.password);

    const password_check = await bcrypt.compare(password, userPassword.password);
    console.log('password_check: ', password_check);

    if (!password_check) {
      throw new CustomError('현재 비밀번호가 일치하지 않습니다.', 412);
    }

    console.log('newPasswordConfirm: ', newPasswordConfirm);
    console.log('newPassword: ', newPassword);

    if (newPassword !== newPasswordConfirm) {
      throw new CustomError('비밀번호가 일치하지 않습니다.', 412);
    }

    const hashed_password = await bcrypt.hash(newPassword, 12);
    console.log('hashed_password: ', hashed_password);

    const updatePassword = await userRepository.updatePassword(user_id, hashed_password);
    const updateUser = await userRepository.updateUserInfo(user_id, nickname);

    if (updatePassword && updateUser) {
      return 1;
    } else {
      throw new CustomError('내 정보 수정에 실패 했습니다.', 400);
    }
  } else {
    const updateUser = await userRepository.updateUserInfo(user_id, nickname);

    if (updateUser) {
      return 1;
    } else {
      throw new CustomError('내 정보 수정에 실패 했습니다.', 400);
    }
  }
};

module.exports = {
  findUser,
  updateUserInfo,
};
