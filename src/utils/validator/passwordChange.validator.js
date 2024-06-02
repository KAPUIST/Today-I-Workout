import Joi from joi

// 비밀번호 변경 joi 스키마
const schema = Joi.object({
    oldPassword: Joi.string().min(8).required(),
    newPassword: Joi.string().min(8).required(),
});



// 비밀번호 변겅 유효성 검사 미들웨어
export const passwordChangeValidator = async (req, res, next) => {
    try {
        await schema.validateAsync(req.body);
        next();
    }catch (error) {
        next(error);
    }

};


