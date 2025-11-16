class ErrorHandler extends Error {
    statusCode : number;
    message : string;

    constructor(statusCode: number, message : string){
        super(message);
        this.statusCode = statusCode || 500;
        this.message = message || "Internal Server Error";
        Error.captureStackTrace(this, this.constructor)
    }
}