const jwt = require('jsonwebtoken');
const { User } = require('../models');

const { CustomError } = require('../utils/Error');

// Access Token을 생성
function createAccessToken(id) {
  // console.log('id: ', id);
  const accessToken = jwt.sign(
    {
      user_id: id, // JWT DATA
    },
    process.env.JWT_SECRET_KEY, // 비밀키
    {
      expiresIn: '1h', // Access Token이 10초 뒤에 만료되도록 설정합니다.
    }
  );

  return accessToken;
}

// Access Token을 검증합니다.
function validateAccessToken(accessToken) {
  try {
    jwt.verify(accessToken, process.env.JWT_SECRET_KEY); // JWT를 검증합니다.
    return true;
  } catch (error) {
    return false;
  }
}

// Access Token의 Payload를 가져옵니다.
function getAccessTokenPayload(accessToken) {
  try {
    const payload = jwt.verify(accessToken, process.env.JWT_SECRET_KEY); // JWT에서 Payload를 가져옵니다.

    return payload;
  } catch (error) {
    return null;
  }
}

// Refresh Token을 검증합니다.
function validateRefreshToken(refreshToken) {
  try {
    jwt.verify(refreshToken, process.env.JWT_SECRET_KEY); // JWT를 검증합니다.
    return true;
  } catch (error) {
    return false;
  }
}

// Refresh Token의 Payload를 가져옵니다.
function getRefreshTokenPayload(refreshToken) {
  try {
    const payload = jwt.verify(refreshToken, process.env.JWT_SECRET_KEY); // JWT에서 Payload를 가져옵니다.
    return payload;
  } catch (error) {
    return null;
  }
}

// 로그인된 상태
const isLoggedIn = async (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken; // res.clearCookie('refresh_token');
    const refreshToken = req.cookies.refreshToken; // res.clearCookie('refresh_token');

    console.log('refreshToken: ', refreshToken);
    console.log('accessToken: ', accessToken);

    if (!refreshToken)
      return res.status(403).json({ errorMessage: '[Refresh Token is null] 로그인된 사용자만 접근이 가능합니다.' });
    if (!accessToken)
      return res.status(403).json({ errorMessage: '[Access Token is null] 로그인된 사용자만 접근이 가능합니다.' });

    const isAccessTokenValidate = validateAccessToken(accessToken);
    // console.log('isAccessTokenValidate: ', isAccessTokenValidate);
    const isRefreshTokenValidate = validateRefreshToken(refreshToken);
    // console.log('isRefreshTokenValidate: ', isRefreshTokenValidate);

    //* refresh token이 없으면 쿠키 다 지우고 로그인 화면으로 리다이렉트 하기
    // console.log('refreshToken 검증: ', isRefreshTokenValidate);
    if (!isRefreshTokenValidate) {
      return res.status(403).json({ errorMessage: 'Refresh Token이 만료되었습니다.' });
    }

    if (!isAccessTokenValidate) {
      const refreshTokenId = getRefreshTokenPayload(refreshToken);
      // console.log('refreshTokenId: ', refreshTokenId);
      if (!refreshTokenId) {
        return res.status(403).json({ errorMessage: 'Refresh Token의 정보가 서버에 존재하지 않습니다.' });
      }

      const newAccessToken = createAccessToken(refreshTokenId.user_id);

      res.cookie('accessToken', newAccessToken);

      const userNewAccessToken = getAccessTokenPayload(newAccessToken);

      res.locals.user = userNewAccessToken.user_id;
      next();
    } else {
      const user = getAccessTokenPayload(accessToken);

      res.locals.user = user.user_id;
      next();
    }
  } catch (error) {
    console.log(error);
    return res.status(403).send({
      errorMessage: '로그인 후 이용 가능한 기능입니다.',
    });
  }
};

const isLoggedInForLogout = (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken; // res.clearCookie('refresh_token');
    // console.log('acessToken: ', accessToken);

    if (!accessToken) {
      return res.status(403).send({
        errorMessage: '로그인된 사용자만 접근이 가능합니다.',
      });
    } else {
      next();
    }
  } catch (error) {
    console.log('error: ', error);
    res.status(403).json({ errorMessage: '로그아웃 실패, 관리자에게 문의하세요.' });
  }
};

module.exports = {
  isLoggedIn,
  isLoggedInForLogout,
};
