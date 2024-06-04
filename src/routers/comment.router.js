import express from "express";
import { requireAccessToken } from "../middlewares/auth.middleware.js";
import { commentLikeToggle } from "../services/post.service.js";

const router = express.Router();

//테스트
// const testMiddleware = (req, res, next) => {
//     req.user = { id: "6210fefd-3317-4cf1-adbb-047e8b6b79ce" }; // 테스트용 ID 설정
//     next();
// };

/** 댓글 수정 API */

router.patch("/comments/:commentId", async (req, res, next) => {});

/** 댓글 삭제 API */

router.delete("/comments/:commentId", async (req, res, next) => {});

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
