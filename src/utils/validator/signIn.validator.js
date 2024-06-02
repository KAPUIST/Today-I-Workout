import Joi from 'joi';

// 로그인 Joi 스키마
const schema = Joi.object({
    email: Joi.string().email().required().messages({
        'any.required': "이메일을 입력해주세요.",
        'string.email': "이메일 형식이 올바르지 않습니다."
    }),
    password: Joi.string().required().messages({
        'any.required': "비밀번호를 입력해주세요.",
    }),
});

// 로그인 유효성 검사 미들웨어
export const signInValidator = async (req, res, next) => {
    try {
        await schema.validateAsync(req.body);
        next();
    } catch (error) {
        res.status(400).json({
            status: 400,
            message: error.details[0].message,
        });
    }
};