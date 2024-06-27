"use strict";
// message, status code, error codes, error
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorCode = exports.HttpException = void 0;
class HttpException extends Error {
    constructor(message, errorCode, statusCode, error) {
        super(message);
        this.message = message;
        this.errorCode = errorCode;
        this.statusCode = statusCode;
        this.errors = error;
    }
}
exports.HttpException = HttpException;
var ErrorCode;
(function (ErrorCode) {
    ErrorCode[ErrorCode["INTERNAL_EXCEPTION"] = 3001] = "INTERNAL_EXCEPTION";
    ErrorCode[ErrorCode["LIGHT_NOT_FOUND"] = 5001] = "LIGHT_NOT_FOUND";
    ErrorCode[ErrorCode["SCHEDULE_NOT_FOUND"] = 5002] = "SCHEDULE_NOT_FOUND";
    ErrorCode[ErrorCode["UNPROCESSABLE_ENTITY"] = 2001] = "UNPROCESSABLE_ENTITY";
})(ErrorCode || (exports.ErrorCode = ErrorCode = {}));
