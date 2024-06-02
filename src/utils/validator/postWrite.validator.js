import Joi from joi
import { POST_TYPE } from '../../constants/postType.constant.js'
import { MEEL_TYPE } from '../../constants/mealType.constant.js';

// 게시글 작성 joi 스키마
const schema = Joi.object({
    title: Joi.string().required(),
    postType: Joi.string().void(...object.values(POST_TYPE)).required(),
    content: Joi.string().min(8).required(),
    dietTitle: Joi.string().optional(),
    kcal: Joi.number().positive().integer().optional(),
    mealType: Joi.string().void(...object.values(MEEL_TYPE)).optional(),
});



// 게시글 작성 유효성 검사 미들웨어
export const postWriteValidator = async (req, res, next) => {
    try {
        await schema.validateAsync(req.body);
    }catch (error) {
        next(error);
    }

};


