const { user_signup } = require('../services/signup.post.service');

class SignupController {
  signup = async (req, res) => {
    try {
      const { email, password, passwordConfirm, authority, name, nickname } = req.body;

      const singupResult = await user_signup(email, password, passwordConfirm, authority, nickname);

      return res.status(200).send({
        message: '회원가입 성공',
        result: Boolean(singupResult),
      });
    } catch (error) {
      console.log(error);
      if (error.statusCode) {
        return res.status(error.statusCode).json({
          errorMessage: error.message,
          status: error.statusCode,
        });
      } else {
        return res.status(400).json({ errorMessage: '회원가입에 실패 했습니다.' });
      }
    }
  };
}

module.exports = SignupController;
