import express from "express";

import { signUpValidator } from "../utils/validator/signUp.validator.js";
import { createUser, findUserByEmail, sendMail } from "../services/auth.service.js";
import { verifyEmailAccessToken } from "../utils/jwt.util.js";
import ErrorHandler from "../utils/customErrorHandler.js";
import STATUS_CODES from "../constants/status.constant.js";

const router = express.Router();

/** 2. 회원가입 API 이메일을 발송합니다.*/
router.post("/auth/signup", signUpValidator, async (req, res, next) => {
    try {
        const userData = req.body;
        console.log(userData);
        const duplicateUser = await findUserByEmail(userData.email);
        if (duplicateUser) {
            throw new ErrorHandler(STATUS_CODES.BAD_REQUEST, "이미 존재하는 유저입니다.");
        }
        await sendMail(userData);
        return res.status(200).json({ message: "이메일이 발송되었습니다." });
    } catch (error) {
        next(error);
    }
});

/** 3. 이메일 인증 API */
router.get("/auth/verification/:token", async (req, res, next) => {
    try {
        const { token } = req.params;
        const userData = verifyEmailAccessToken(token);

        if (!userData) {
            throw new ErrorHandler(STATUS_CODES.UNAUTHORIZED, "토큰 검증에 실패 하였습니다.");
        }
        await createUser(userData.userData);
        res.sendStatus(201);
    } catch (error) {
        next(error);
    }
});

/** 로그인 API */
router.post("/auth/signin", async (req, res, next) => {});

/** 로그아웃 API */
router.post("/auth/logout", async (req, res, next) => {});

export default router;
