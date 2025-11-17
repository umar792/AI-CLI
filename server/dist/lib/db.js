import { PrismaClient } from "@prisma/client";
export const Prisma = new PrismaClient();
export const connectQDB = async () => {
    try {
        await Prisma.$connect();
        return Prisma;
    }
    catch (error) {
        console.log(`Database connection error due to ${error?.message}`);
    }
};
