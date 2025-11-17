import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import express from "express";
import { error } from "./middleware/error.js";
import { connectQDB } from "./lib/db.js";



// dotenv 
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
morgan(':method :url :status :res[content-length] - :response-time ms')

const server = app.listen(process.env.PORT || 5000 , ()=>{
    connectQDB().then(()=>{
        console.log("Database connected successfully");
    }).catch((error:any)=>{
        console.log(`Database connection error due to ${error?.message}`);
    })
    console.log(`Server is running on port ${process.env.PORT || 5000}`)
})


app.use(error);
process.on("unhandledRejection", (error:any)=>{
    console.log(`Unhandled rejection error due to ${error?.message}`);
    console.log("server is shutting down");
    server.close(() => {
        process.exit(1); // kill the node process
    });
})
process.on("uncaughtException", (error)=>{
    console.log(`uncaughtException error due to ${error?.message}`);
    console.log("server is shutting down");
    server.close(() => {
        process.exit(1); // kill the node process
    });
})