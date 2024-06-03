import express from "express";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt.util.js";
import STATUS_CODES from "../constants/status.constant.js";
import { signInValidator } from "../utils/validator/signIn.validator.js";

const router = express.Router();
const prisma = new PrismaClient();

/** 회원가입 API */

router.post("/auth/signup", async (req, res, next) => {});

/** 이메일 인증 API */

router.get("/auth/verification/:token", async (req, res, next) => {});

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
router.post("/auth/logout", async (req, res, next) => {});

export default router;
