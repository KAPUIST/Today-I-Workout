import { prisma } from "../utils/prisma/prisma.util.js";
import STATUS_CODES from "../constants/status.constant.js";
import { orderOptions } from "../constants/order.constant.js";

export const fetchPostsByPostType = async (postType, orderBy) => {
    let order;

    switch (orderBy) {
        case "likes":
            order = orderOptions.likes;
            break;
        case "oldest":
            order = orderOptions.oldest;
            break;
        case "latest":
        default:
            order = orderOptions.latest;
            break;
    }
    return await prisma.post.findMany({ where: { post_type: postType }, orderBy: order });
};

// 댓글생성 1-3 댓글을 데이터베이스에 생성
export const createNewComment = async (id, postId, content) => {
    const newComment = await prisma.comment.create({
        data: {
            user_id: id,
            post_id: postId,
            content: content
        }
    });
    return newComment;
};
