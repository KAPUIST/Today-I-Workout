import express from "express";
import nodemailer from "nodemailer";
import crypto from "crypto";

const router = express.Router();
const verificationTokens = {}; // 토큰 저장용

/** 2. 회원가입 API */
router.post("/auth/signup", async (req, res, next) => {
    // 1. 회원 이메일 설정(nodemailer 이용)
    const tranSporter = nodemailer.createTransport({
        host: process.env.MEMBER_HOST, // 이메일을 보낼 호스트의 주소
        port: +process.env.MEMBER_PORT, // 이메일을 보낼 때 사용할 포트번호 보통 465(SSL) 사용, 587(TLS)
        secure: false, // 포트가  465인 경우에만 secure를 true로 설정한다.
        auth: {
            user: process.env.MEMBER_USER, // 사용자 유저
            pass: process.env.MEMBER_APP_PASS // 비밀번호
        }
    });

    try {
        const { email, password, username, currentWeight, goalWeight, exerciseType, intro } = req.body;

        const responseDate = {
            email,
            password,
            username,
            current_weight: currentWeight,
            goal_weight: goalWeight,
            exercise_type: exerciseType,
            intro
        };

        // 2-1. 랜덤 토큰 생성
        const token = crypto.randomBytes(20).toString("hex");
        verificationTokens[token] = email;

        const verificationLink = `http://localhost:3000/api/auth/verification/${token}`;

        // 2-2. 이메일 옵션 설정
        const mailOptions = {
            from: process.env.MEMBER_USER, // 발신자 주소
            to: email, // 수신자 주소
            subject: "이메일 인증확인", // 이메일 제목
            text: `이메일 인증을 위해 아래 링크를 클릭해주세요: ${verificationLink}` // 일반 텍스트 본문
            // html: `<b>이메일 인증을 위해 아래 링크를 클릭해주세요: <a href="${verificationLink}">${verificationLink}</a></b>`, // HTML 본문
        };
        await tranSporter.sendMail(mailOptions);
        res.status(200).json(responseDate);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "서버오류" });
    }
});

/** 3. 이메일 인증 API */
router.get("/auth/verification/:token", async (req, res, next) => {
    try {
        const { token } = req.params;
        const email = verificationTokens[token];

        if (email) {
            delete verificationTokens[token];
            res.status(200).json("이메일 인증이 완료되었습니다.");
        } else {
            res.status(400).json("유효하지 않은 토큰입니다.");
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "서버오류" });
    }
});

/** 로그인 API */
router.post("/auth/signin", async (req, res, next) => {});

/** 로그아웃 API */
router.post("/auth/logout", async (req, res, next) => {});

export default router;
