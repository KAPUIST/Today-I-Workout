import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient({
    log: ["query", "info", "warn", "error"],
    errorFormat: "pretty"
});

export async function connectDatabase() {
    try {
        await prisma.$connect();
        console.info("성공적으로 연결 MySQL DB로 연결~");
    } catch (error) {
        console.error("데이터 베이스 연결에 실패 ㅜ.ㅜ", error);
    } finally {
        await prisma.$disconnect();
    }
}
