import express from "express";

const router = express.Router();

/** 게시글 생성 API */

router.post("/posts", async (req, res, next) => {});

/** 나의 게시글 조회 API */

router.get("/posts/myposts?postType={postType}", async (req, res, next) => {});

/** 게시글 타입별 조회/ 전체 게시글 조회 API */

router.get("/posts?postType={postType}", async (req, res, next) => {});

/** 게시글 상세조회 API */

router.get("/posts/:postid", async (req, res, next) => {});

/** 게시글 수정 API */

router.patch("/posts/:postid", async (req, res, next) => {});

/** 게시글 삭제 API */

router.delete("/posts/:postid", async (req, res, next) => {});

/** 게시글 좋아요/취소 토글 API */

router.patch("/posts/:postid/likes", async (req, res, next) => {});

/** 댓글 생성 API */

router.post("/posts/:postid/comments", async (req, res, next) => {});

/** 댓글 조회 API */

router.get("/posts/:postid/comments", async (req, res, next) => {});

export default router;
