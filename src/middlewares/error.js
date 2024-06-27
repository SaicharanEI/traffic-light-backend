"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
var errorMiddleware = function (error, req, res, next) {
    res.status(error.statusCode).json({
        message: error.message,
        errorCode: error.errorCode,
        errors: error.errors
    });
};
exports.errorMiddleware = errorMiddleware;
