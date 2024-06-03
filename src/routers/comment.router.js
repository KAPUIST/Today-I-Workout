import express from "express";

const router = express.Router();

/** 댓글 수정 API */
router.patch("/comments/:commentId", async (req, res, next) => {
  try {
    
  } catch(error) {
    next(error);
  }

});

/** 댓글 삭제 API */
router.delete("/comments/:commentId", async (req, res, next) => {
  try {
    
  } catch(error) {
    next(error);
  }

});




/** 댓글 좋아요 / 취소 토글 API */

router.patch("/comments/:commentid/likes", async (req, res, next) => {});

export default router;
