import Joi from "joi";

// 로그인 joi 스키마
const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required()
});

// 로그인 유효성 검사 미들웨어
export const singInValidator = async (req, res, next) => {
    try {
        await schema.validateAsync(req.body);
        next();
    } catch (error) {
        next(error);
    }
};
