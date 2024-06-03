import Joi from "joi";

// 댓글 작성 joi 스키마
const schema = Joi.object({
    comment: Joi.string().required()
});

// 댓글 작성 유효성 검사 미들웨어
export const commentValidator = async (req, res, next) => {
    try {
        await schema.validateAsync(req.body);
        next();
    } catch (error) {
        next(error);
    }
};
