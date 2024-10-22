import { Client } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";

// hotreload in next14 to not initialize too many clients
declare global {
    var prisma: PrismaClient | undefined;
};

export const db = globalThis.prisma || new PrismaClient();

if(process.env.NODE_ENV !== "production") globalThis.prisma = db
