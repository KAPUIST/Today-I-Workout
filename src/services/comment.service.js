import { prisma } from "../utils/prisma/prisma.util.js";
export const fetchCommentsById = async (commentId) => {
    const comment = await prisma.comment.findFirst({
        where: {
            id: commentId
        }
    });
    return comment;
};

export const updateCommentByCommentId = async (commentId, content) => {
    const updatedComment = await prisma.comment.update({
        where: {
            id: commentId
        },
        data: {
            content: content
        }
    });
    return updatedComment;
};

export const deleteCommentByCommentId = async (commentId) => {
    await prisma.comment.delete({
        where: {
            id: commentId
        }
    });
};
