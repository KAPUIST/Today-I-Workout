import { prisma } from "../utils/prisma/prisma.util.js";
import STATUS_CODES from "../constants/status.constant.js";
import { orderOptions } from "../constants/order.constant.js";
import ErrorHandler from "../utils/customErrorHandler.js";

// 게시글 생성 로직
export const createPost = async (userId, title, content, postType, dietInfo) => {
    // Prisma를 이용해 새로운 게시글을 생성합니다.
    const newPost = await prisma.post.create({
        data: {
            user_id: userId,
            // title이 없으면 dietTitle을 사용합니다.
            title: title || dietInfo.dietTitle,
            content,
            post_type: postType,
            // dietInfo가 존재하면 Diet 데이터를 함께 생성합니다.
            diet: dietInfo
                ? {
                      create: {
                          // dietTitle이 없으면 title을 사용합니다.
                          diet_title: dietInfo.dietTitle || title,
                          kcal: dietInfo.kcal || 0,
                          meal_type: dietInfo.mealType || "Breakfast" // 기본값 설정
                      }
                  }
                : undefined
        },
        // 생성된 게시글에 Diet 정보가 포함합니다.
        include: {
            diet: true
        }
    });

    // 생성된 게시글 정보를 반환
    return {
        id: newPost.id,
        title: newPost.title,
        postType: newPost.post_type,
        content: newPost.content,
        createdAt: newPost.created_at,
        updatedAt: newPost.updated_at,
        diet: newPost.diet
            ? {
                  dietTitle: newPost.diet.diet_title,
                  kcal: newPost.diet.kcal,
                  mealType: newPost.diet.meal_type
              }
            : null
    };
};
// 나의 게시글 조회 로직
export const fetchMyPosts = async (userId, postType, orderBy) => {
    let order; //orderBy 값에 따라 정렬 방식을 설정합니다.
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
    if (postType && !["TIW", "DIET"].includes(postType)) {
        //postType이 있을때 TIW인지 DIET인지 검증 타입별 조회 -> posts/myposts?postType=DIET 하면 DIET만되고 TIW하면 TIW만 ㅇㅇ
        throw new ErrorHandler(STATUS_CODES.BAD_REQUEST, "유효한 postType을 입력해주세요.");
    }

    return await prisma.post.findMany({ where: { user_id: userId, post_type: postType }, orderBy: order });
};

// 타입별 조회/ 전체 게시글 조회 로직
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

// 게시글 상세조회 로직
export const fetchPostSangsae = async (id) => {
    const post = await prisma.post.findFirst({
        where: { id: id },
        select: {
            id: true,
            user_id: true,
            post_type: true,
            title: true,
            content: true,
            like_count: true,
            created_at: true,
            updated_at: true,
            diet: {
                // Diet 테이블 관련 데이터 포함
                select: {
                    post_id: true,
                    diet_title: true,
                    kcal: true,
                    meal_type: true
                }
            }
        }
    });

    if (!id) {
        throw new ErrorHandler(STATUS_CODES.BAD_REQUEST, "일치하는 게시글이 없습니다.");
    }
    return post;
};
// 게시글 수정 로직
export const editPost = async (userId, postId, title, content, postType) => {
    // → 현재 로그인 한 사용자가 작성한 게시글만 수정합니다.
    // → DB에서 게시글 조회 시 게시글 ID, 작성자 ID가 모두 일치해야 합니다.
    const post = await prisma.post.findFirst({
        where: {
            user_id: userId,
            id: postId
        },
        select: {
            id: true,
            user_id: true,
            post_type: true,
            title: true,
            content: true,
            like_count: true,
            created_at: true,
            updated_at: true,
            diet: {
                // Diet 테이블 관련 데이터 포함
                select: {
                    post_id: true,
                    diet_title: true,
                    kcal: true,
                    meal_type: true
                }
            }
        }
    });
    // → 제목, 내용 둘 다 없는 경우 → “수정 할 정보를 입력해 주세요.”
    if (!title && !content) {
        throw new ErrorHandler(STATUS_CODES.BAD_REQUEST, "수정 할 정보를 입력해주세요.");
    }
    // → 게시글 정보가 없는 경우 → “게시글이 존재하지 않습니다.”
    if (!post) {
        throw new ErrorHandler(STATUS_CODES.NOT_FOUND, "게시글이 존재하지 않습니다.");
    }
    // → DB에서 게시글 정보를 수정합니다.
    // → 제목, 내용, 포스트타입은 개별 수정이 가능합니다.
    const updatedpost = await prisma.post.update({
        where: { id: postId },
        data: {
            ...(title && { title }),
            ...(content && { content }),
            ...(postType && { post_type: postType })
        }
    });
    // → 수정 된 게시글 ID, 작성자 ID, 포스트타입, 제목, 내용, 좋아요, 생성일시, 수정일시를 반환합니다.
    return updatedpost;
};

// 게시글 삭제 로직
export const deletePost = async (userId, postId) => {
    // → 게시글이 없는 경우 → “게시글이 존재하지 않습니다.”
    if (!postId) {
        throw new ErrorHandler(STATUS_CODES.NOT_FOUND, "게시글이 존재하지 않습니다.");
    }

    const post = await prisma.post.findFirst({
        where: {
            user_id: userId,
            id: postId
        }
    });

    if (!post) {
        throw new ErrorHandler(STATUS_CODES.BAD_REQUEST).json({ message: "일치하는 게시글이 없습니다." });
    }

    // → DB에서 게시글 정보를 삭제합니다.
    const deletepost = await prisma.post.delete({
        where: { id: postId }
    });
    return deletepost;
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
        return { status: STATUS_CODES.CREATED, message: "좋아요를 눌렀습니다." };
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

export const commentLikeToggle = async (commentId, userId) => {
    const comment = await prisma.comment.findUnique({
        where: {
            id: commentId
        }
    });

    if (!comment) {
        throw new ErrorHandler(STATUS_CODES.NOT_FOUND, "댓글을 찾을 수 없습니다.");
    }

    if (userId === comment.user_id) {
        throw new ErrorHandler(STATUS_CODES.BAD_REQUEST, "자신이 작성한 댓글에는 좋아요를 누를 수 없습니다.");
    }

    const like = await prisma.commentLike.findFirst({
        where: {
            comment_id: commentId,
            user_id: userId
        }
    });

    if (!like) {
        await prisma.commentLike.create({
            data: {
                user: {
                    connect: { id: userId }
                },
                comment: {
                    connect: { id: commentId }
                }
            }
        });
        await prisma.comment.update({
            where: { id: commentId },
            data: { like_count: { increment: 1 } }
        });
        return { status: STATUS_CODES.CREATED, message: "댓글에 좋아요를 눌렀습니다." };
    } else {
        await prisma.commentLike.delete({
            where: {
                id: like.id
            }
        });
        await prisma.comment.update({
            where: { id: commentId },
            data: { like_count: { decrement: 1 } }
        });
        return { status: STATUS_CODES.OK, message: "댓글에 좋아요를 취소했습니다." };
    }
};
