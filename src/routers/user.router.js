import express from "express";
import { requireAccessToken } from "../middlewares/auth.middleware.js";
import { getUserInfoByUserId } from "../services/user.service.js";
import ErrorHandler from "../utils/customErrorHandler.js";
import STATUS_CODES from "../constants/status.constant.js";

const router = express.Router();

/** 내 정보 조회 API */

router.get("/users/me", requireAccessToken, async (req, res, next) => {
    try {
        const userInfo = await getUserInfoByUserId(req.user.id);
        if (!userInfo) {
            throw new ErrorHandler(STATUS_CODES.NOT_FOUND, "유저를 찾을수없습니다.");
        }
        res.status(200).json({ data: userInfo });
    } catch (error) {
        next(error);
    }
});

/** 비밀번호 변경 API */

router.patch("/users/me/password", async (req, res, next) => {});

/** 내 정보 수정 API */
router.patch("/users/me", async (req, res, next) => {});

export default router;
