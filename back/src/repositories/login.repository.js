class LoginRepository {
  constructor(UserModel) {
    this.userModel = UserModel;
  }

  findUser = async (email) => {
    const findUser = await this.userModel.findOne({
      where: {
        email: email,
      },
    });
    return findUser;
  };
}

module.exports = LoginRepository;
