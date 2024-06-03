import Joi from "joi";
import { EXERCISE_TYPE } from "../../constants/exerciseType.constant.js";

// 회원가입 joi 스키마
const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    currentWeight: Joi.number().positive().required(),
    goalWeight: Joi.number().positive().required(),
    username: Joi.string().required(),
    exerciseType: Joi.string()
        .void(...Object.values(EXERCISE_TYPE))
        .required(),
    intro: Joi.string().required()
});

// 회원가입 유효성 검사 미들웨어
export const singUpValidator = async (req, res, next) => {
    try {
        await schema.validateAsync(req.body);
        next();
    } catch (error) {
        next(error);
    }
};
