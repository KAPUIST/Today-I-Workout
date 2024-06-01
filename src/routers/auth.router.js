import express from 'express';


const router = express.Router();

/** 회원가입 API */

router.post('/auth/signup', async (req, res, next) => {


})

/** 이메일 인증 API */

router.get('/auth/verification/:token', async (req, res, next) => {


})

/** 로그인 API */
router.post('/auth/signin', async (req, res, next) => {


})


/** 로그아웃 API */
router.post('/auth/logout', async (req, res, next) => {


})

export default router;
