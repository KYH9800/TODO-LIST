const { user_login } = require('../services/login.service');

class LoginController {
  login = async (req, res) => {
    try {
      const { email, password } = req.body;

      const token = await user_login(email, password);

      if (process.env.NODE_ENV === 'production') {
        res.cookie('accessToken', token.accessToken, { sameSite: 'None', secure: true, httpOnly: true });
        res.cookie('refreshToken', token.refreshToken, { sameSite: 'None', secure: true, httpOnly: true });
      } else {
        res.cookie('accessToken', token.accessToken);
        res.cookie('refreshToken', token.refreshToken);
      }

      return res.status(200).send({
        message: '로그인 성공',
        token: token.accessToken,
      });
    } catch (error) {
      console.log(error);
      if (error.statusCode) {
        return res.status(error.statusCode).json({
          errorMessage: error.message,
          status: error.statusCode,
        });
      } else {
        return res.status(400).json({ errorMessage: '로그인에 실패 했습니다.' });
      }
    }
  };

  logout = async (req, res) => {
    try {
      await res.clearCookie('accessToken');
      await res.clearCookie('refreshToken');

      return res.status(204).json({
        message: '로그아웃 완료',
      });
    } catch (error) {
      console.log(error);
      if (error.message) {
        return res.status(error.statusCode).send({
          errorMessage: error.message,
          status: error.statusCode,
        });
      }
      return res.status(400).send({
        errorMessage: '로그아웃에 실패하였습니다.',
      });
    }
  };
}

module.exports = LoginController;
