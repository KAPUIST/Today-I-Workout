import express from "express";
import { commentLikeToggle } from "../services/post.service.js";

//테스트
// const testMiddleware = (req, res, next) => {
//     req.user = { id: "6210fefd-3317-4cf1-adbb-047e8b6b79ce" }; // 테스트용 ID 설정
//     next();
// };

import STATUS_CODES from "../constants/status.constant.js";
import { fetchPostsByPostType } from "../services/post.service.js";
import ErrorHandler from "../utils/customErrorHandler.js";
import { requireAccessToken } from "../middlewares/auth.middleware.js";
import { prisma } from "../utils/prisma/prisma.util.js";

const router = express.Router();

/** 3. 댓글 수정 API */
router.patch("/comments/:commentId", requireAccessToken, async (req, res, next) => {
    try {
        const { id } = req.user;
        const { commentId } = req.params;
        const { content } = req.body;
        // 3-1. 댓글이 존재하는지 확인
        const comment = await prisma.comment.findFirst({
            where: {
                id: commentId
            }
        });
        // 3-2. 댓글이 존재하지 않을 때 메시지 반환
        if (!comment) {
            throw new ErrorHandler(STATUS_CODES.NOT_FOUND, "댓글이 존재하지 않습니다");
        }
        // 3-3. 댓글 작성자와 현재 사용자가 일치하는지 확인
        if (comment.user_id !== id) {
            throw new ErrorHandler(STATUS_CODES.FORBIDDEN, "권한이 없습니다");
        }
        // 3-4. 댓글 수정
        const updatedComment = await prisma.comment.update({
            where: {
                id: commentId
            },
            data: {
                content: content
            }
        });
        // 3-5. 성공적으로 수정된 댓글 데이터 반환
        res.status(STATUS_CODES.OK).json({ data: updatedComment });
    } catch (error) {
        next(error);
    }
});


/** 4 댓글 삭제 API */
router.delete("/comments/:commentId", requireAccessToken, async (req, res, next) => {
    try {
        const { id } = req.user;
        const { commentId } = req.params;
        // 4-1. 댓글이 존재하는지 확인
        const comment = await prisma.comment.findFirst({
            where: {
                id: commentId
            }
        });
        // 4-2. 댓글이 존재하지 않을 때 메시지 반환
        if (!comment) {
            throw new ErrorHandler(STATUS_CODES.NOT_FOUND, "댓글이 존재하지 않습니다");
        }
        // 4-3. 댓글 작성자와 현재 사용자가 일치하는지 확인
        if (comment.user_id !== id) {
            throw new ErrorHandler(STATUS_CODES.FORBIDDEN, "권한이 없습니다");
        }
        // 4-4. 댓글 삭제
        await prisma.comment.delete({
            where: {
                id: commentId
            }
        });
        // 4-5. 성공적으로 삭제되었음을 알린다
        res.status(STATUS_CODES.NO_CONTENT).json({});
    } catch (error) {
        next(error);
    }
});

/** 댓글 좋아요 / 취소 토글 API */

router.patch("/comments/:commentId/likes", requireAccessToken, async (req, res, next) => {
    console.log(req.params);
    console.log(req.user);

    const { commentId } = req.params;
    const { id: userId } = req.user;

    try {
        const result = await commentLikeToggle(commentId, userId);

        return res.status(result.status).json({ message: result.message });
    } catch (error) {
        next(error);
    }
});

export default router;
