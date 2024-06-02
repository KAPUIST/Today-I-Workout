import express from "express";
import { connectDatabase } from "./utils/prisma.util.js";
import dotenv from "dotenv";
import authRouter from "./routers/auth.router.js";
import userRouter from "./routers/user.router.js";
import postRouter from "./routers/post.router.js";
import commentRouter from "./routers/comment.router.js";
import { CustomErrorHandler } from "./middlewares/error.middleware.js";
import ErrorHandler from "./utils/customErrorHandler.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use("/", [authRouter, userRouter, postRouter, commentRouter]);

app.use("/health", (req, res, next) => {
    res.status(200).send("ping");
});
app.use(CustomErrorHandler);
const startServer = async () => {
    try {
        await connectDatabase();
        app.listen(PORT, () => {
            console.log(`서버가 ${PORT}번 포트에서 실행 중입니다.`);
        });
    } catch (error) {
        console.error("데이터베이스 연결 실패:", error);
        process.exit(1); // 실패 코드로 프로세스 종료
    }
};

startServer();
