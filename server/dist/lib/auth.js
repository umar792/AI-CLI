import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { Prisma } from "./db.js";
export const auth = betterAuth({
    database: prismaAdapter(Prisma, {
        provider: "mysql",
    }),
    basePath: "/api/auth",
    trustedOrigins: ["http://localhost:3000"],
    socialProviders: {
        github: {
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
        }
    }
});
