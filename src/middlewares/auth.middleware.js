import jwt from 'jsonwebtoken';
import STATUS_CODES from '../constants/statusCode.js';


// 액세스 토큰 생성 함수
// AccessToken(Payload에 사용자 ID를 포함하고 유효기간이 12시간)을 생성합니다.
const generateAccessToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '12h' });
};

module.exports = { generateAccessToken };

// .env에 만들고  로그인하는 사람이 함수가져다쓰게 

export const requireAccessToken = async (req, res) => {
    try {
        //인증 정보 파싱 
        const Authorization = req.cooKie.Authorization;

        //Authorization이 없는경우

        //jwt 표준 인증형태와 일치하지 않는 경우

        //AccessToken 없는 경우

        //AccessToken 유효기간이 지난 경우

        // 그밖에 검증에 실패한 경우

        //payload에 담긴 사용자 id와 일치하는 사용자가 없는 경우





        next();
    } catch (error) {
        next(error)
    }
}