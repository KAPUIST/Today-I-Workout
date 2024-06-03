import express from "express";
import STATUS_CODES from "../constants/status.constant.js";
import { fetchPostsByPostType } from "../services/post.service.js";
import ErrorHandler from "../utils/customErrorHandler.js";
const router = express.Router();

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

router.patch("/posts/:postId/likes", async (req, res, next) => {});

/** 댓글 생성 API */

router.post("/posts/:postId/comments", async (req, res, next) => {});

/** 댓글 조회 API */

router.get("/posts/:postId/comments", async (req, res, next) => {});

export default router;
