import jwt from "jsonwebtoken";
import { ACCESS_SECRET, EMAIL_SECRET, REFRESH_SECRET } from "../constants/env.constant.js";

// 액세스 토큰 생성 함수
// AccessToken(Payload에 사용자 ID를 포함하고 유효기간이 12시간)을 생성합니다.
export const generateAccessToken = (userId) => {
    return jwt.sign({ id: userId }, ACCESS_SECRET, { expiresIn: "12h" });
};

// 리프래쉬 토큰 생성 함수
// RefreshToken(Payload에 사용자 ID를 포함하고 유효기간이 일주일)을 생성합니다.
export const generateRefreshToken = (userId) => {
    return jwt.sign({ id: userId }, REFRESH_SECRET, { expiresIn: "7d" });
};

//이메일 인증 토큰 생성 함수
// AccessToken(Payload에 사용자 ID를 포함하고 유효기간이 10분)을 생성합니다.
export const generateEmailAccessToken = (userData) => {
    return jwt.sign({ userData }, EMAIL_SECRET, { expiresIn: "10m" });
};
//이메일 인증 토큰 검증 함수
// AccessToken(Payload에 사용자 ID를 포함하고 유효기간이 10분)을 생성합니다.
export const verifyEmailAccessToken = (token) => {
    return jwt.verify(token, EMAIL_SECRET);
};

//리프레쉬 토큰 검증 함수
export const verifyRefreshToken = (token) => {
    return jwt.verify(token, REFRESH_SECRET);
};
