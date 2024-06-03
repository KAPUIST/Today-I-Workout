import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
    // 미리 user2를 생성하여 user1에서 참조 가능하도록 함
    await prisma.$transaction(async (tx) => {
        const user2 = await tx.user.create({
            data: {
                email: "user2@example.com",
                password: "password2",
                userinfo: {
                    create: {
                        current_weight: 80,
                        goal_weight: 75,
                        username: "User two",
                        exercise_type: "Weight",
                        intro: "Intro for User Two"
                    }
                },
                posts: {
                    create: [
                        {
                            post_type: "TIW",
                            title: "Post 1 by User 2",
                            content: "Content for Post 1"
                        }
                    ]
                }
            }
        });

        // 더미 유저 데이터 생성
        const user1 = await tx.user.create({
            data: {
                email: "user1@example.com",
                password: "password1",
                userinfo: {
                    create: {
                        current_weight: 70,
                        goal_weight: 65,
                        username: "User One",
                        exercise_type: "Cardio",
                        intro: "Intro for User One"
                    }
                },
                posts: {
                    create: [
                        {
                            post_type: "TIW",
                            title: "Post 1 by User 1",
                            content: "Content for Post 1",
                            comment: {
                                create: {
                                    user_id: user2.id,
                                    content: "Comment for Post 1"
                                }
                            }
                        },
                        {
                            post_type: "DIET",
                            title: "Post 2 by User 1",
                            content: "Content for Post 2",
                            diet: {
                                create: {
                                    diet_title: "Diet Title 1",
                                    kcal: 500,
                                    meal_type: "Breakfast"
                                }
                            }
                        }
                    ]
                }
            }
        });
    });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
