import express from "express";
import STATUS_CODES from "../constants/status.constant.js";
import {
    fetchPostsByPostType,
    createNewComment,
    createPost,
    fetchMyPosts,
    fetchPostSangsae,
    editPost,
    deletePost
} from "../services/post.service.js";
import { requireAccessToken } from "../middlewares/auth.middleware.js";
import { postWriteValidator } from "../utils/validator/postWrite.validator.js";
import { prisma } from "../utils/prisma/prisma.util.js";
import ErrorHandler from "../utils/customErrorHandler.js";
import { likeToggle } from "../services/post.service.js";

const router = express.Router();

//테스트
// const testMiddleware = (req, res, next) => {
//     req.user = { id: "6210fefd-3317-4cf1-adbb-047e8b6b79ce" }; // 테스트용 ID 설정
//     next();
// };

/** 게시글 생성 API */
router.post("/posts", requireAccessToken, postWriteValidator, async (req, res, next) => {
    const { title, content, postType, dietTitle, kcal, mealType } = req.body;
    try {
        // 로그인한 친구의 ID를 가져옵니다.
        const { id: userId } = req.user;

        // dietTitle, kcal, mealType 중 하나라도 존재하면 dietInfo 출력합니다.
        const dietInfo =
            dietTitle || kcal || mealType
                ? {
                      dietTitle,
                      kcal,
                      mealType
                  }
                : null;

        // 새로운 게시글을 생성
        const newPostData = await createPost(userId, title, content, postType, dietInfo);

        // 생성된 게시글 정보를 반환
        return res.status(STATUS_CODES.CREATED).json({
            message: "새로운 게시글이 생성되었습니다.",
            data: newPostData
        });
    } catch (error) {
        next(error);
    }
});

/** 나의 게시글 조회 API */ // 데이터베이스에서 게시글 조회 조건 설정
router.get("/posts/myposts", requireAccessToken, async (req, res, next) => {
    const { postType, orderBy } = req.query;
    const { id: userId } = req.user;

    try {
        // 조회된 게시글을 반환합니당
        const posts = await fetchMyPosts(userId, postType, orderBy);
        return res.status(STATUS_CODES.OK).json({ data: posts });
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

router.get("/posts/:postId", async (req, res, next) => {
    const { postId } = req.params;
    try {
        const postSangsae = await fetchPostSangsae(postId);
        res.status(STATUS_CODES.OK).json({ postSangsae });
    } catch (error) {
        next(error);
    }
});

/** 게시글 수정 API */

router.patch("/posts/:postId", requireAccessToken, async (req, res, next) => {
    const { id: userId } = req.user;
    const { postId } = req.params;
    const { title, content, postType } = req.body;
    try {
        const updatedpost = await editPost(userId, postId, title, content, postType);
        res.status(STATUS_CODES.OK).json({ data: updatedpost });
    } catch (error) {
        next(error);
    }
});

/** 게시글 삭제 API */

router.delete("/posts/:postId", requireAccessToken, async (req, res, next) => {
    const { id: userId } = req.user;
    const { postId } = req.params;
    try {
        const post = await deletePost(userId, postId);
        res.status(STATUS_CODES.OK).json({ data: post.id });
    } catch (error) {
        next(error);
    }
});

/** 게시글 좋아요/취소 토글 API */

router.patch("/posts/:postId/likes", async (req, res, next) => {});
router.patch("/posts/:postId/likes", requireAccessToken, async (req, res, next) => {
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
/** 1. 댓글 생성 API */
router.post("/posts/:postId/comments", requireAccessToken, async (req, res, next) => {
    try {
        const { id } = req.user;
        const { postId } = req.params;
        const { content } = req.body;

        // 1-1 게시글이 존재하는지 확인하기
        const post = await prisma.post.findFirst({
            where: {
                id: postId
            }
        });

        // 1-2 게시글이 존재하지 않을때 메시지 반환
        if (!post) {
            throw new ErrorHandler(STATUS_CODES.BAD_REQUEST, "게시글이 존재하지 않습니다");
        }
        // // 댓글생성 1-3 댓글을 데이터베이스에 생성
        // const newComment = await prisma.comment.create({
        //     data: {
        //         user_id: id,
        //         post_id: postId,
        //         content: content,
        //     },
        // });
        const comment = await createNewComment(id, postId, content);
        // 1-4 성공했을때 댓글 데이터 반환
        res.status(STATUS_CODES.CREATED).json({ data: comment });
    } catch (error) {
        next(error);
    }
});

/** 댓글 조회 API */

router.get("/posts/:postId/comments", async (req, res, next) => {});
/** 2 댓글 조회 API */
router.get("/posts/:postId/comments", async (req, res, next) => {
    try {
        const { postId } = req.params;
        // 2-1 게시글이 존재하는지 확인
        const post = await prisma.post.findFirst({
            where: {
                id: postId
            }
        });
        // 2-2 게시글이 존재하지 않을때 메시지 반환
        if (!post) {
            throw new ErrorHandler(STATUS_CODES.BAD_REQUEST, "게시글이 존재하지 않습니다");
        }
        // 2-3 해당 게시글에 대한 댓글 불러오기
        const comments = await prisma.comment.findMany({
            where: {
                post_id: postId
            },
            orderBy: {
                created_at: "desc" // 댓글 생성일시 내림차순 정렬
            }
        });
        // 2-4 성공적으로 불러온 댓글 데이터 반환
        res.status(STATUS_CODES.OK).json({ data: comments });
    } catch (error) {
        next(error);
    }
});

export default router;
