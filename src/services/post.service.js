import { prisma } from "../utils/prisma.util.js";
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
