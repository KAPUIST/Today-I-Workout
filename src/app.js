import express from "express";
import authRouter from './routers/auth.router.js';
import userRouter from './routers/user.router.js';
import postRouter from './routers/post.router.js';
import commentRouter from './routers/comment.router.js';

const app = express();

app.use('/api', [authRouter, userRouter, postRouter, commentRouter])

app.listen(3000, () => {
    console.log("?");
});
