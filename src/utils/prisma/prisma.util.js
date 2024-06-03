import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient({
    log: ["query", "info", "warn", "error"],
    errorFormat: "pretty"
});
export async function connectDatabase() {
    await prisma.$connect();
}
