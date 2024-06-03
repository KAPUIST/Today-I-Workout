import { prisma } from "../utils/prisma/prisma.util.js";

export const getUserInfoByUserId = async (userId) => {
    const userInfo = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            id: true,
            email: true,
            userinfo: {
                select: {
                    username: true,
                    current_weight: true,
                    exercise_type: true,
                    goal_weight: true,
                    intro: true
                }
            }
        }
    });
    return userInfo;
};
