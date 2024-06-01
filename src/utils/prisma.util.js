import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient({
    log: ["query", "info", "warn", "error"],
    errorFormat: "pretty"
});
export async function connectDatabase() {
    try {
        await prisma.$connect();
    } catch (error) {
        console.error("데이터베이스 연결에 실패했습니다:", error);
    }
}
