class UserRepository {
  constructor(UserModel, TodoModel) {
    this.userModel = UserModel;
    this.todoModel = TodoModel;
  }

  // 내 정보 불러오기
  findUser = async (user_id) => {
    try {
      console.log('UserRepository user_id: ', user_id);

      const user = await this.userModel.findOne({
        where: {
          user_id: user_id,
        },
        attributes: ['user_id', 'email', 'authority', 'nickname', 'createdAt', 'updatedAt'],
        include: [
          {
            model: this.todoModel,
          },
        ],
      });
      // console.log('db 요청 결과: ', user);
      return user;
    } catch (error) {
      console.log('error: ', error);
    }
  };

  // 비밀번호 수정을 위한 user 정보 찾기
  findUserPassword = async (user_id) => {
    const userPassword = await this.userModel.findOne({
      where: {
        user_id: user_id,
      },
      attributes: ['password'],
    });

    return userPassword;
  };

  // 내 정보 수정, 비밀번호 변경
  updatePassword = async (user_id, newPassword) => {
    const updatePassword = await this.userModel.update(
      {
        password: newPassword,
      },
      {
        where: {
          user_id: user_id,
        },
      }
    );

    return updatePassword;
  };

  // 닉네임 변경
  updateUserInfo = async (user_id, nickname) => {
    const updateUser = this.userModel.update(
      {
        nickname: nickname,
      },
      {
        where: {
          user_id: user_id,
        },
      }
    );

    return updateUser;
  };
}

module.exports = UserRepository;
