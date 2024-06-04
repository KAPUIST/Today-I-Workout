import express from "express";
import STATUS_CODES from "../constants/status.constant.js";
import { fetchPostsByPostType, createNewComment } from "../services/post.service.js";
import { createPost } from "../services/post.service.js";
import { requireAccessToken } from "../middlewares/auth.middleware.js";
import { postWriteValidator } from "../utils/validator/postWrite.validator.js";
import { prisma } from "../utils/prisma/prisma.util.js";
import ErrorHandler from "../utils/customErrorHandler.js";
import { likeToggle } from "../services/post.service.js";


const router = express.Router();

// 테스트용 미들웨어
const testMiddleware = (req, res, next) => {
    req.user = { id: '5ba2c2af-76b2-4585-bbfe-478b477a7fc4' }; // 테스트용 ID 설정
    next();
};

//테스트
// const testMiddleware = (req, res, next) => {
//     req.user = { id: "6210fefd-3317-4cf1-adbb-047e8b6b79ce" }; // 테스트용 ID 설정
//     next();
// };

/** 게시글 생성 API */
router.post("/posts", requireAccessToken, postWriteValidator, async (req, res, next) => {
    const { title, content, postType } = req.body;
    try {
        const { id } = req.user;

        const newPostData = await createPost(id, title, content, postType);

        return res.status(STATUS_CODES.CREATED).json({
            message: '새로운 게시글이 생성되었습니다.',
            data: newPostData
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
                updated_at: true,
                diet: {                   // Diet 테이블 관련 데이터 포함
                    select: {
                        post_id: true,
                        diet_title: true,
                        kcal: true,
                        meal_type: true
                    }
                }
            }
        });

        if (!post) {
            throw new ErrorHandler(STATUS_CODES.BAD_REQUEST, "일치하는 게시글이 없습니다.");
        }

        return res.status(STATUS_CODES.OK).json(post);
    } catch (error) {
    } next(error);
});

/** 게시글 수정 API */

router.patch("/posts/:postId", testMiddleware, async (req, res, next) => {
    const { id: userId } = req.user;
    const { postId } = req.params;
    const { title, content, postType } = req.body;
    try {
        // → 제목, 자기소개 둘 다 없는 경우 → “수정 할 정보를 입력해 주세요.”
        if (!title && !content) {
            throw new ErrorHandler(STATUS_CODES.BAD_REQUEST, "수정 할 정보를 입력해주세요.")
        }
        // → 게시글이 없는 경우 → “게시글이 존재하지 않습니다.”
        if (!postId) {
            throw new ErrorHandler(STATUS_CODES.NOT_FOUND, "게시글이 존재하지 않습니다.")
        }
        // → 현재 로그인 한 사용자가 작성한 게시글만 수정합니다.
        // → DB에서 게시글 조회 시 게시글 ID, 작성자 ID가 모두 일치해야 합니다.
        const post = await prisma.post.findFirst({
            where: {
                user_id: userId,
                id: postId
            },
            select: {
                id: true,
                user_id: true,
                post_type: true,
                title: true,
                content: true,
                like_count: true,
                created_at: true,
                updated_at: true,
                diet: {                   // Diet 테이블 관련 데이터 포함
                    select: {
                        post_id: true,
                        diet_title: true,
                        kcal: true,
                        meal_type: true
                    }
                }
            }
        });
        // → 게시글 정보가 없는 경우 → “게시글이 존재하지 않습니다.”
        if (!post) {
            throw new ErrorHandler(STATUS_CODES.NOT_FOUND, "게시글이 존재하지 않습니다.")
        }
        // → DB에서 게시글 정보를 수정합니다.
        // → 제목, 내용, 포스트타입은 개별 수정이 가능합니다.
        const updatedpost = await prisma.post.update({
            where: { id: postId },
            data: {
                ...(title && { title }),
                ...(content && { content }),
                ...(postType && { post_type: postType }),
            },
        });
        // → 수정 된 게시글 ID, 작성자 ID, 포스트타입, 제목, 내용, 좋아요, 생성일시, 수정일시를 반환합니다.
        return res.status(STATUS_CODES.OK).json({ data: updatedpost });


    } catch (error) {
        next(error);
    }

});

/** 게시글 삭제 API */

router.delete("/posts/:postId", testMiddleware, async (req, res, next) => {
    const { id: userId } = req.user;
    const { postId } = req.params;
    try {
        // → 게시글이 없는 경우 → “게시글이 존재하지 않습니다.”
        if (!postId) {
            throw new ErrorHandler(STATUS_CODES.NOT_FOUND, "게시글이 존재하지 않습니다.")
        }

        const post = await prisma.post.findFirst({
            where: {
                user_id: userId,
                id: postId,
            }
        });

        if (!post) {
            throw new ErrorHandler(STATUS_CODES.BAD_REQUEST).json({ message: "일치하는 게시글이 없습니다." });
        }

        // → DB에서 게시글 정보를 삭제합니다.
        const deletepost = await prisma.post.delete({
            where: { id: postId, }
        });

        // → 삭제 된 게시글 ID를 반환합니다.
        const result = { postId: deletepost.id, };

        return res.status(STATUS_CODES.OK).json({ data: result });

    } catch (error) {
    } next(error);
});



/** 게시글 좋아요/취소 토글 API */

router.patch("/posts/:postId/likes", async (req, res, next) => { });
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

router.post("/posts/:postId/comments", async (req, res, next) => { });
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

router.get("/posts/:postId/comments", async (req, res, next) => { });
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
