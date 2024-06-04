import { MEMBER_APP_PASS, MEMBER_HOST, MEMBER_PORT, MEMBER_USER } from "../constants/env.constant.js";
import nodemailer from "nodemailer";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt.util.js";
import bcrypt from "bcrypt";
import { generateEmailAccessToken } from "../utils/jwt.util.js";
import ErrorHandler from "../utils/customErrorHandler.js";
import STATUS_CODES from "../constants/status.constant.js";
import { prisma } from "../utils/prisma/prisma.util.js";
export const findUserByEmail = async (email) => {
    return await prisma.user.findUnique({ where: { email } });
};
export const findUserById = async (userId) => {
    return await prisma.user.findFirst({ where: { id: userId } });
};
export const sendMail = async (userData) => {
    try {
        const transporter = nodemailer.createTransport({
            host: MEMBER_HOST, // 이메일을 보낼 호스트의 주소
            port: +MEMBER_PORT, // 포트를 숫자로 변환
            secure: +MEMBER_PORT === 465, // 포트가 465인 경우에만 secure를 true로 설정
            auth: {
                user: MEMBER_USER, // 사용자 유저
                pass: MEMBER_APP_PASS // 비밀번호
            }
        });

        userData.password = await hashPassword(userData.password);

        const token = generateEmailAccessToken(userData);
        const verificationLink = `http://localhost:3000/auth/verification/${token}`;
        console.log(userData.password);

        // 이메일 옵션 설정
        const mailOptions = {
            from: MEMBER_USER, // 발신자 주소
            to: userData.email, // 수신자 주소
            subject: "이메일 인증확인", // 이메일 제목
            html: `<b>이메일 인증을 위해 아래 링크를 클릭해주세요: <a href="${verificationLink}">이메일 인증 링크!</a></b>` // HTML 본문
        };

        await transporter.sendMail(mailOptions);
    } catch (error) {
        throw new ErrorHandler(STATUS_CODES.INTERNAL_SERVER_ERROR, "이메일 보내기에 실패했습니다.");
    }
};
export const createUser = async (userData) => {
    const { email, password, currentWeight, goalWeight, username, exerciseType, intro } = userData;
    try {
        await prisma.$transaction(async (tx) => {
            const user = await tx.user.create({
                data: { email, password }
            });

            await tx.userInfo.create({
                data: {
                    user_id: user.id,
                    current_weight: currentWeight,
                    goal_weight: goalWeight,
                    username,
                    exercise_type: exerciseType,
                    intro
                }
            });
        });
    } catch (error) {
        throw new ErrorHandler(STATUS_CODES.INTERNAL_SERVER_ERROR, "User 생성 실패");
    }
};

const hashPassword = async (password) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        return hashedPassword;
    } catch (error) {
        throw new ErrorHandler(STATUS_CODES.INTERNAL_SERVER_ERROR, "에러가 발생했습니다.");
    }
};

export const createToken = async (userId) => {
    console.log(userId, "id");
    const accessToken = generateAccessToken(userId);
    const refreshToken = generateRefreshToken(userId);
    return { accessToken, refreshToken };
};
export const loginUser = async (email, password) => {
    const user = await prisma.user.findUnique({ where: { email } });
    console.log(user);

    if (!user) {
        throw new ErrorHandler(STATUS_CODES.UNAUTHORIZED, "인증 정보가 유효하지 않습니다.");
    }

    const isPasswordMatched = user && bcrypt.compareSync(password, user.password);

    if (!isPasswordMatched) {
        throw new ErrorHandler(STATUS_CODES.UNAUTHORIZED, "인증 정보가 유효하지 않습니다.");
    }

    const { accessToken, refreshToken } = await createToken(user.id);

    // res.cookie("accessToken", accessToken, {});
    // res.cookie("refreshToken", refreshToken, {});

    return { accessToken, refreshToken };

    // return res.status(STATUS_CODES.OK).json({
    //     status: STATUS_CODES.OK,
    //     message: "로그인 완료",
    //     data: { accessToken, refreshToken }
    // });
};

// export const verifyrefreshToken = (token) => {
//     try {
//         return jwt.verify(token, process.env.ACCESS_SECRET);
//     } catch (error) {
//         throw new ErrorHandler(STATUS_CODES.UNAUTHORIZED, "유효하지 않은 토큰입니다.");
//     }
// };
