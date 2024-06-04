import Joi from "joi";
import { POST_TYPE } from "../../constants/postType.constant.js";
import { MEAL_TYPE } from "../../constants/mealType.constant.js";

// 게시글 작성 joi 스키마
const schema = Joi.object({
    title: Joi.string(),
    postType: Joi.string()
        .valid(...Object.values(POST_TYPE))
        .required(),
    content: Joi.string().min(8).required(),
    dietTitle: Joi.string(),
    kcal: Joi.number().positive().integer().optional(),
    mealType: Joi.string()
        .valid(...Object.values(MEAL_TYPE))
        .optional()
})
    .or("title", "dietTitle")
    .messages({
        "object.missing": '"title" 또는 "dietTitle" 중 하나는 필수입니다.'
    });

// 게시글 작성 유효성 검사 미들웨어
export const postWriteValidator = async (req, res, next) => {
    try {
        await schema.validateAsync(req.body);
        next();
    } catch (error) {
        next(error);
    }
};
