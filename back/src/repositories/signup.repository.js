class SignupRepository {
  constructor(UserModel) {
    this.userModel = UserModel;
  }

  // 이메일 중복확인
  findEmail = async (email) => {
    const findEmail = await this.userModel.findOne({
      where: {
        email: email,
      },
    });

    return findEmail;
  };

  // 닉네임 중복확인
  findNickname = async (nickname) => {
    const findNickname = await this.userModel.findOne({
      where: {
        nickname: nickname,
      },
    });

    return findNickname;
  };

  // 회원가입
  signup = async (email, password, authority, nickname) => {
    const user = await this.userModel.create({
      email: email,
      password: password,
      authority: authority,
      nickname: nickname,
    });
    console.log('user: ', user);

    return user;
  };
}

module.exports = SignupRepository;
