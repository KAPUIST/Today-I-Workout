import { prisma } from "../utils/prisma/prisma.util.js";
import STATUS_CODES from "../constants/status.constant.js";
import { orderOptions } from "../constants/order.constant.js";
import ErrorHandler from "../utils/customErrorHandler.js";

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

export const likeToggle = async (postId, userId) => {
    const post = await prisma.post.findUnique({
        where: {
            id: postId
        }
    });

    if (!post) {
        throw new ErrorHandler(STATUS_CODES.NOT_FOUND, "포스트를 찾을 수 없습니다.");
    }

    if (userId === post.user_id) {
        throw new ErrorHandler(STATUS_CODES.BAD_REQUEST, "자신이 만든 포스트는 좋아요를 누를 수 없습니다.");
    }

    const like = await prisma.postLike.findUnique({
        where: {
            post_id_user_id: {
                post_id: postId,
                user_id: userId
            }
        }
    });
    // like 이미 눌렸는지 아는 함수
    if (!like) {
        // postId와 userId로 새로운 좋아요를 추가
        await prisma.postLike.create({
            data: {
                user: {
                    connect: { id: userId }
                },
                post: {
                    connect: { id: postId }
                }
            }
        });
        await prisma.post.update({
            where: { id: postId },
            data: { like_count: { increment: 1 } }
        });
        throw new ErrorHandler(STATUS_CODES.CREATED, "좋아요를 눌렀습니다.");
    } else {
        await prisma.postLike.delete({
            where: {
                post_id_user_id: {
                    post_id: postId,
                    user_id: userId
                }
            }
        });
        await prisma.post.update({
            where: { id: postId },
            data: { like_count: { decrement: 1 } }
        });
        return { status: STATUS_CODES.OK, message: "좋아요를 취소했습니다." };
    }
};
