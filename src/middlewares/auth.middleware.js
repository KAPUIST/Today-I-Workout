import jwt from 'jsonwebtoken';
import STATUS_CODES from '../constants/status.constant.js';
import { prisma } from '../utils/prisma.util.js';
import ErrorHandler from "../utils/customErrorHandler.js";

export const requireaccessToken = async (req, res, next) => {
    try {
        //인증 정보 파싱 
        const authorization = req.cookies.authorization;

        //Authorization이 없는경우
        if (!authorization) {
            throw new ErrorHandler(STATUS_CODES.UNAUTHORIZED, '인증 정보가 없습니다.')
        }

        //jwt 표준 인증형태와 일치하지 않는 경우
        const [tokenType, accessToken] = authorization.split(' ');

        if (!tokenType !== 'Bearer') {
            throw new ErrorHandler(STATUS_CODES.UNAUTHORIZED, '지원하는 인증형태가 아닙니다.')
        }

        //accessToken 없는 경우
        if (!accessToken) {
            throw new ErrorHandler(STATUS_CODES.UNAUTHORIZED, 'accessToken이 없습니다.')
        }
        //accessToken 유효기간이 지난 경우 그밖에 검증에 실패한 경우 
        const payload = jwt.verify(accessToken, process.env.ACCESS_SECRET)

        const user = await prisma.user.findUnique({
            where: { id: payload.id }
        })

        //payload에 담긴 사용자 id와 일치하는 사용자가 없는 경우
        if (!user) {
            throw new ErrorHandler(STATUS_CODES.UNAUTHORIZED, '인증정보와 일치하는 사용자가 없습니다.')
        }

        // 조회 된 사용자를 req.user에 넣습니다.

        req.user = user;


        next();
    } catch (error) {
        next(error)
    }
}