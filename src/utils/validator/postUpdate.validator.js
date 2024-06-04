import Joi from "joi";
import { POST_TYPE } from "../../constants/postType.constant.js";
import { MEAL_TYPE } from "../../constants/mealType.constant.js";

// 게시글 작성 joi 스키마
const schema = Joi.object({
    title: Joi.string(),
    postType: Joi.string()
        .valid(...Object.values(POST_TYPE))
        .optional(),
    content: Joi.string().min(8).optional(),
    dietTitle: Joi.string().when("postType", { is: "DIET", then: Joi.required() }),
    kcal: Joi.number().positive().integer().optional().when("postType", { is: "DIET", then: Joi.required() }),
    mealType: Joi.string()
        .valid(...Object.values(MEAL_TYPE))
        .optional()
        .when("postType", { is: "DIET", then: Joi.required() })
});

// 게시글 작성 유효성 검사 미들웨어
export const postUpdateValidator = async (req, res, next) => {
    try {
        await schema.validateAsync(req.body);
        next();
    } catch (error) {
        next(error);
    }
};
