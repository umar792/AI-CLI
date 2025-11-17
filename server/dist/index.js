import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import express from "express";
import { error } from "./middleware/error.js";
import { connectQDB } from "./lib/db.js";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth.js";
// dotenv 
dotenv.config();
const app = express();
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.all("/api/auth/*splat", toNodeHandler(auth));
app.use(express.json());
const server = app.listen(process.env.PORT || 5000, () => {
    connectQDB().then(() => {
        console.log("Database connected successfully");
    }).catch((error) => {
        console.log(`Database connection error due to ${error?.message}`);
    });
    console.log(`Server is running on port ${process.env.PORT || 5000}`);
});
app.use(error);
process.on("unhandledRejection", (error) => {
    console.log(`Unhandled rejection error due to ${error?.message}`);
    console.log("server is shutting down");
    server.close(() => {
        process.exit(1); // kill the node process
    });
});
process.on("uncaughtException", (error) => {
    console.log(`uncaughtException error due to ${error?.message}`);
    console.log("server is shutting down");
    server.close(() => {
        process.exit(1); // kill the node process
    });
});
