const express = require('express');
const router = express.Router();

// :TODO
const todoRouter = require('./todo.routes');
router.use('/todo', todoRouter);

// user
const userRouter = require('./user.routes');
router.use('/user', userRouter);

module.exports = router;
