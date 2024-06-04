import bcrypt from "bcrypt";
import STATUS_CODES from "../constants/status.constant.js";
import { prisma } from "../utils/prisma/prisma.util.js";

export const passwordChangeService = async (req, res, next) => {
    try {
        const { oldPassword, newPassword, confirmPassword } = req.body;
        const userId = req.user.id;
        //유저가 존재하는지 확인
        console.log(userId);
        const user = await prisma.user.findUnique({
            where: { id: userId }
        });
        // 현재 비밀번호와 DB 유저 비밀번호 비교
        const dbPasswordMatch = await bcrypt.compare(oldPassword, user.password);
        if (!dbPasswordMatch) {
            throw new ErrorHandler(STATUS_CODES.NOT_FOUND, "일치하는 사용자가 없습니다.");
        }
        //바꾼 비밀번호와 비밀번호 확인 비교
        if (newPassword !== confirmPassword) {
            throw new ErrorHandler(STATUS_CODES.BAD_REQUEST, "비밀번호 확인과 일치하지 않습니다.");
        }
        // 새 비밀번호 암호화
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        // 새 비밀번호 업데이트
        await prisma.user.update({
            where: { id: userId },
            data: { password: hashedPassword }
        });
        res.sendStatus(STATUS_CODES.NO_CONTENT);
    } catch (error) {
        next(error);
    }
};
