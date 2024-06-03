import Joi from "joi";
import { EXERCISE_TYPE } from "../../constants/exerciseType.constant.js";

// 회원가입 joi 스키마
const schema = Joi.object({
    currentWeight: Joi.number().positive(),
    goalWeight: Joi.number().positive(),
    username: Joi.string(),
    exerciseType: Joi.string().valid(...Object.values(EXERCISE_TYPE)),
    intro: Joi.string()
});

// 회원가입 유효성 검사 미들웨어
export const updateUserInfoValidator = async (req, res, next) => {
    try {
        await schema.validateAsync(req.body);
        next();
    } catch (error) {
        next(error);
    }
};
