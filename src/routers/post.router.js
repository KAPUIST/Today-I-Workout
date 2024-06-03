import express from "express";
import STATUS_CODES from "../constants/status.constant.js";
import { fetchPostsByPostType } from "../services/post.service.js";
// import { requireaccessToken } from "../middlewares/auth.middleware.js";
import { postWriteValidator } from "../utils/validator/postWrite.validator.js";
import { prisma } from "../utils/prisma/prisma.util.js";
import ErrorHandler from "../utils/customErrorHandler.js";
const router = express.Router();

// 테스트용 미들웨어
const testMiddleware = (req, res, next) => {
    req.user = { id: '5ba2c2af-76b2-4585-bbfe-478b477a7fc4' }; // 테스트용 ID 설정
    next();
};

/** 게시글 생성 API */
router.post("/posts", testMiddleware, postWriteValidator, async (req, res, next) => {
    // 제목, 내용을 Request Body(req.body)로 전달 받습니다.
    const { title, content, postType } = req.body;
    try {
        // 사용자 ID는 미들웨어를 통해 req.user에 설정됨
        const { id } = req.user;

        // 새로운 게시글 생성
        const newpost = await prisma.post.create({
            data: {
                user_id: id,
                title,
                content,
                post_type: postType,
            }
        });
        // → 게시글 ID, 게시글 ID, 제목, 내용, 생성일시, 수정일시를 반환합니다.
        return res.status(STATUS_CODES.CREATED).json({
            message: '새로운 게시글이 생성되었습니다.',
            data: {
                id: newpost.id,
                title: newpost.title,
                postType: newpost.post_type,
                content: newpost.content,
                createdAt: newpost.created_at,
                updatedAt: newpost.updated_at
            }

        });
    } catch (error) {
        next(error);
    }
});


/** 나의 게시글 조회 API */
router.get("/posts/myposts?postType={postType}", testMiddleware, postWriteValidator, async (req, res, next) => {
    const { postType } = req.query;
    const { id: userId } = req.user;

    try {
        // if (!postType || !['TIW', 'DIET'].includes(postType)) {
        //     return res.status(STATUS_CODES.BAD_REQUEST).json({
        //         message: 'Invalid post type.'
        //     });
        // }

        const posts = await prisma.post.findMany({
            where: {
                user_id: userId,
                post_type: postType
            },
            orderBy: {
                created_at: 'desc'
            }
        });

        return res.status(STATUS_CODES.OK).json({
            data: {
                id: posts.id,
                title: posts.title,
                postType: posts.post_type,
                content: posts.content,
                createdAt: posts.created_at,
                updatedAt: posts.updated_at
            }

        });
    } catch (error) {
        next(error);
    }
});

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

router.get("/posts/:postId", async (req, res, next) => { });

/** 게시글 수정 API */

router.patch("/posts/:postId", async (req, res, next) => { });

/** 게시글 삭제 API */

router.delete("/posts/:postId", async (req, res, next) => { });

/** 게시글 좋아요/취소 토글 API */

router.patch("/posts/:postId/likes", async (req, res, next) => { });

/** 댓글 생성 API */

router.post("/posts/:postId/comments", async (req, res, next) => { });

/** 댓글 조회 API */

router.get("/posts/:postId/comments", async (req, res, next) => { });

export default router;
