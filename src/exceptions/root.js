"use strict";
// message, status code, error codes, error
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorCode = exports.HttpException = void 0;
var HttpException = /** @class */ (function (_super) {
    __extends(HttpException, _super);
    function HttpException(message, errorCode, statusCode, error) {
        var _this = _super.call(this, message) || this;
        _this.message = message;
        _this.errorCode = errorCode;
        _this.statusCode = statusCode;
        _this.errors = error;
        return _this;
    }
    return HttpException;
}(Error));
exports.HttpException = HttpException;
var ErrorCode;
(function (ErrorCode) {
    ErrorCode[ErrorCode["INTERNAL_EXCEPTION"] = 3001] = "INTERNAL_EXCEPTION";
    ErrorCode[ErrorCode["LIGHT_NOT_FOUND"] = 5001] = "LIGHT_NOT_FOUND";
    ErrorCode[ErrorCode["SCHEDULE_NOT_FOUND"] = 5002] = "SCHEDULE_NOT_FOUND";
    ErrorCode[ErrorCode["UNPROCESSABLE_ENTITY"] = 2001] = "UNPROCESSABLE_ENTITY";
})(ErrorCode || (exports.ErrorCode = ErrorCode = {}));
