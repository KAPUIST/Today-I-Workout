import express from "express";
import { prisma } from "../utils/prisma/prisma.util.js";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt.util.js";
import STATUS_CODES from "../constants/status.constant.js";
import { signInValidator } from "../utils/validator/signIn.validator.js";
import { signUpValidator } from "../utils/validator/signUp.validator.js";
import { findUserByEmail, sendMail, createUser } from "../services/auth.service.js";

import { verifyEmailAccessToken } from "../utils/jwt.util.js";

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
router.post("/auth/signin", signInValidator, async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await prisma.user.findUnique({ where: { email } });
        console.log(user);

        if (!user) {
            return res.status(STATUS_CODES.UNAUTHORIZED).json({
                status: STATUS_CODES.UNAUTHORIZED,
                message: "인증 정보가 유효하지 않습니다."
            });
        }

        // const isPasswordMatched =
        //     user && bcrypt.compareSync(password, user.password);

        // if (!isPasswordMatched) {
        //     return res.status(STATUS_CODES.UNAUTHORIZED).json({
        //         status: STATUS_CODES.UNAUTHORIZED,
        //         message: "인증 정보가 유효하지 않습니다.",
        //     });
        // }

        const accessToken = generateAccessToken(user.id);
        const refreshToken = generateRefreshToken(user.id);

        res.cookie("accessToken", accessToken, {});

        res.cookie("refreshToken", refreshToken, {});

        return res.status(STATUS_CODES.OK).json({
            status: STATUS_CODES.OK,
            message: "로그인 완료",
            data: { accessToken, refreshToken }
        });
    } catch (error) {
        next(error);
    }
});

/** 로그아웃 API */
router.post("/auth/logout", async (req, res, next) => {
    try {
        //리프레시 토큰을 제거 혹은 NULL값으로 이코드는 NULL값으로 만듬
        // const user = req.user;
        // const refreshToken = await prisma.refreshToken.delete({
        //     where: { userId: user.id},
        //     data: {
        //         refreshToken: null,
        //     },
        // });
        //쿠키에서 리프레시 토큰 제거 (스키마에 refreshToken모델이 없어서 NULL값으로 만드는게 불가능)
        res.cookie("accessToken", "", { maxAge: 0, httpOnly: true });
        res.cookie("refreshToken", "", { maxAge: 0, httpOnly: true });

        return res.status(STATUS_CODES.OK).json({
            status: STATUS_CODES.NO_CONTENT,
            message: "로그아웃 완료"
        });
    } catch (error) {
        next(error);
    }
});

export default router;
