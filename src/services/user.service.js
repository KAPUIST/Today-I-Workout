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

export const updateUserInfo = async (userId, userInputData) => {
    const userInfoData = {
        current_weight: userInputData.currentWeight,
        goal_weight: userInputData.goalWeight,
        username: userInputData.username,
        exercise_type: userInputData.exerciseType,
        intro: userInputData.intro
    };

    return await prisma.userInfo.update({
        where: { user_id: userId },
        data: userInfoData
    });
};
