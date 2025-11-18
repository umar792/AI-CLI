import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth.js";
import { error } from "./middleware/error.js";
import { connectQDB } from "./lib/db.js";
export class Server {
    app;
    PORT;
    server;
    constructor() {
        // load config
        dotenv.config();
        // initialize app
        this.app = express();
        this.PORT = Number(process.env.PORT) || 5000;
    }
    loadMiddleware() {
        this.app.use(cors({
            origin: "http://localhost:3000",
            credentials: true,
        }));
        this.app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
        this.app.all("/api/auth/*splat", toNodeHandler(auth));
        this.app.use(express.json());
    }
    loadErrorHandling() {
        this.app.use(error.handle);
    }
    handleProcessErrors() {
        process.on("unhandledRejection", (err) => {
            console.log(`Unhandled Rejection: ${err?.message}`);
            console.log("Server shutting down...");
            this.server.close(() => process.exit(1));
        });
        process.on("uncaughtException", (err) => {
            console.log(`Uncaught Exception: ${err?.message}`);
            console.log("Server shutting down...");
            this.server.close(() => process.exit(1));
        });
    }
    async start() {
        await connectQDB().then(() => {
            console.log("Database connected successfully");
            this.server = this.app.listen(this.PORT, () => {
                console.log(`Server is running on port ${process.env.PORT || 5000}`);
            });
        }).catch((error) => {
            console.log(`Database connection error due to ${error?.message}`);
        });
    }
}
