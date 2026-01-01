import { PrismaClient } from "@prisma/client";

const prisma = global.prisma_db || new PrismaClient();

if (process.env.NODE_ENV !== "production") global.prisma_db = prisma;

export default prisma;
