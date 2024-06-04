import express from "express";
import STATUS_CODES from "../constants/status.constant.js";
import { fetchPostsByPostType } from "../services/post.service.js";
import { likeToggle } from "../services/post.service.js";
import ErrorHandler from "../utils/customErrorHandler.js";
import { prisma } from "../utils/prisma/prisma.util.js";
import { requireaccessToken } from "../middlewares/auth.middleware.js";
const router = express.Router();

//테스트
// const testMiddleware = (req, res, next) => {
//     req.user = { id: "6210fefd-3317-4cf1-adbb-047e8b6b79ce" }; // 테스트용 ID 설정
//     next();
// };

/** 게시글 생성 API */

router.post("/posts", async (req, res, next) => {});

/** 나의 게시글 조회 API */

router.get("/posts/myposts?postType={postType}", async (req, res, next) => {});

/** 게시글 타입별 조회/ 전체 게시글 조회 API */

router.get("/posts", async (req, res, next) => {
    const { postType, orderBy } = req.query;
    try {
        const posts = await fetchPostsByPostType(postType, orderBy);
        res.status(STATUS_CODES.OK).json({ data: posts });
    } catch (error) {
        next(error);
    }
});

/** 게시글 상세조회 API */

router.get("/posts/:postId", async (req, res, next) => {});

/** 게시글 수정 API */

router.patch("/posts/:postId", async (req, res, next) => {});

/** 게시글 삭제 API */

router.delete("/posts/:postId", async (req, res, next) => {});

/** 게시글 좋아요/취소 토글 API */

router.patch("/posts/:postId/likes", requireaccessToken, async (req, res, next) => {
    // console.log(req.params);
    // console.log(req.user);
    const { postId } = req.params;
    const { id: userId } = req.user;

    try {
        const result = await likeToggle(postId, userId);
        return res.status(result.status).json({ message: result.message });
    } catch (error) {
        next(error);
    }
});

/** 댓글 생성 API */

router.post("/posts/:postId/comments", async (req, res, next) => {});

/** 댓글 조회 API */

router.get("/posts/:postId/comments", async (req, res, next) => {});

export default router;
