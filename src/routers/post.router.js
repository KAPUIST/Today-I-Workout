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
router.get("/posts/myposts", testMiddleware, async (req, res, next) => {
    const { postType } = req.query;
    const { id: userId } = req.user;

    try {
        // 데이터베이스에서 게시글 조회 조건 설정
        if (postType && !['TIW', 'DIET'].includes(postType)) { //postType이 있을때 TIW인지 DIET인지 검증 || 사용하면 전체조회가 안되는데 if문 2개 쓰면 가능할지도 겹쳐써야하는지 분리해야하는지 잘모르겠슴다
            return res.status(STATUS_CODES.BAD_REQUEST).json({
                message: '유효한 postType을 입력해주세요.' // 유효하지 않은 postType일 경우 메세지 출력
            });
        }


        // 게시글 목록 조회
        const posts = await prisma.post.findMany({
            where: {
                user_id: userId,
                post_type: postType
            },
            orderBy: {
                created_at: 'desc'
            }
        });

        // 조회된 게시글을 반환합니당
        return res.status(STATUS_CODES.OK).json({ data: posts });
    } catch (error) {
        next(error);
    } // 타입별 조회가 가능한데 URL 주소를 변경했습니다. /posts/myposts?postType=DIET 하면 DIET만되고 TIW하면 TIW만 ㅇㅇ 
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

router.get("/posts/:postId", async (req, res, next) => {
    const { id } = req.params;
    try {
        const post = await prisma.post.findFirst({
            where: { id: id },
            select: {
                id: true,
                user_id: true,
                post_type: true,
                title: true,
                content: true,
                like_count: true,
                created_at: true,
                updated_at: true
            }
        });

        if (!post) {
            return res.status(STATUS_CODES.BAD_REQUEST).json({ message: "일치하는 게시글이 없습니다." });
        }

        return res.status(STATUS_CODES.OK).json(post);
    } catch (error) {

    } next(error);
});

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
