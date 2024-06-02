// 에러 핸들링 미들웨어
import ErrorHandler from "../utils/customErrorHandler.js";
import STATUS_CODES from "../constants/statusCode.js";
export function CustomErrorHandler(error, req, res, next) {
    console.error(error);
    error = handleCommonErrors(error);
    error.statusCode = error.statusCode || 500;
    error.message = error.message || "예상치 못한 에러가 발생했습니다. 관리자에게 문의해 주세요.";

    res.status(error.statusCode).json({
        statusCode: error.statusCode,
        message: error.message
    });
}
function handleCommonErrors(error) {
    //토큰 에러
    let newError = error;
    if (error.name === "JsonWebTokenError") {
        const message = "인증 정보가 유효하지 않습니다.";
        newError = new ErrorHandler(STATUS_CODES.UNAUTHORIZED, message);
    }

    if (error.name === "ValidationError") {
        newError = new ErrorHandler(STATUS_CODES.BAD_REQUEST, error.message);
    }
    //토큰 만료
    if (error.name === "TokenExpiredError") {
        const message = `인증 정보가 만료되었습니다.`;
        newError = new ErrorHandler(STATUS_CODES.UNAUTHORIZED, message);
    }
    return newError;
}
