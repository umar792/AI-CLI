class ErrorHandler extends Error {
    statusCode;
    message;
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode || 500;
        this.message = message || "Internal Server Error";
        Error.captureStackTrace(this, this.constructor);
    }
}
export {};
