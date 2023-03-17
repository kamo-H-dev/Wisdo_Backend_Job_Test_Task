const express = require('express');
const router = express.Router();

const postRouter = require('./post.router');
const userRouter = require('./user.router');
const authRouter = require('./auth.router');

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/post', postRouter);



module.exports = router;
