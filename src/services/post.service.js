import { prisma } from "../utils/prisma/prisma.util.js";
import STATUS_CODES from "../constants/status.constant.js";
import { orderOptions } from "../constants/order.constant.js";

export const createPost = async (userId, title, content, postType) => {
    const newPost = await prisma.post.create({
        data: {
            user_id: userId,
            title,
            content,
            post_type: postType,
        }
    });

    return {
        id: newPost.id,
        title: newPost.title,
        postType: newPost.post_type,
        content: newPost.content,
        createdAt: newPost.created_at,
        updatedAt: newPost.updated_at
    };
};

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
