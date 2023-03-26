require('dotenv').config();

const express = require('express');
const app = express();
const port = 3065;

// DB
const db = require('./models');

// cookie-parser
const cookieParser = require('cookie-parser');

// morgan
const morgan = require('morgan');

// CORS
const cors = require('cors');

// helmet - XSS 공격을 방지하기 위한 모듈
const helmet = require('helmet');

// hpp(HTTP Parameter Pollution) - Express의 중복 이름 파라메터 공격을 방어해주는 모듈
const hpp = require('hpp');

// db 연결 확인
db.sequelize
  .sync()
  .then(() => {
    console.log('database 연결 성공');
  })
  .catch(console.error);

// 테이블 수정 적용 여부
db.sequelize.sync({
  force: false,
});

app.use(express.json()); // JSON형태의 데이터를 해석해줍니다.
app.use(express.urlencoded({ extended: false })); // x-www-form-urlencoded(contentType이 urlencoded type의 경우) 형태의 데이터를 해석해준다.
app.use(cookieParser(process.env.COOKIE_SECRET));

// 배포용 || 개발용
if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined'));
  app.use(
    helmet({
      crossOriginResourcePolicy: false,
    })
  );
  app.use(hpp());
  app.use(
    cors({
      origin: true,
      credentials: true,
    })
  );
} else {
  app.use(morgan('dev'));
  app.use(
    cors({
      origin: true,
      credentials: true,
    })
  );
}

// index router
const indexRouter = require('./src/routes');
app.use('/', indexRouter);

app.listen(port, () => {
  console.log(port, 'port start');
});
