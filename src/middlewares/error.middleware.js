// 에러 핸들링 미들웨어
import ErrorHandler from "../utils/validator/customErrorHandler.js";
import STATUS_CODES from "../constants/status.constant.js";
export function CustomErrorHandler(error, req, res, next) {
    console.error(error);
    error = handleCommonErrors(error);
    // 에러 코드와 메시지 설정
    error.statusCode = error.statusCode || STATUS_CODES.INTERNAL_SERVER_ERROR;
    const message =
        error.statusCode === STATUS_CODES.INTERNAL_SERVER_ERROR
            ? "서버에 문제가 발생했습니다. 나중에 다시 시도해 주세요."
            : error.message;

    res.status(error.statusCode).json({
        statusCode: error.statusCode,
        message: message
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
