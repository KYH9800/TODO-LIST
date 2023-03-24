// 로그인이 되지 않은 상태
const isNotLoggedIn = (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken; // res.clearCookie('refresh_token');
    console.log('acessToken in isNotLoggedIn: ', accessToken);

    if (accessToken) {
      return res.status(403).send({
        errorMessage: '로그인되지 않은 사용자만 접근이 가능합니다.',
      });
    } else {
      next();
    }
  } catch (error) {
    console.log('error: ', error);
    res.status(403).json({ errorMessage: 'token 정보가 다릅니다.' });
  }
};

module.exports = {
  isNotLoggedIn,
};
