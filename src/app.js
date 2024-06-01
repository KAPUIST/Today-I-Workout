import express from "express";
import { connectDatabase } from "./utils/prisma.util.js";
import dotenv from "dotenv";
dotenv.config();
const app = express();

const startServer = async () => {
    try {
        await connectDatabase();
        app.listen(3000, () => {
            console.log("서버가 3000번 포트에서 실행 중입니다.");
        });
    } catch (error) {
        console.error("데이터베이스 연결 실패:", error);
        process.exit(1); // 실패 코드로 프로세스 종료
    }
};

startServer();
