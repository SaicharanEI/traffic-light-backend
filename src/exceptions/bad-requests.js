"use strict";
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
exports.BadRequestsException = void 0;
var root_1 = require("./root");
var BadRequestsException = /** @class */ (function (_super) {
    __extends(BadRequestsException, _super);
    function BadRequestsException(message, errorCode, errors) {
        return _super.call(this, message, errorCode, 400, errors) || this;
    }
    return BadRequestsException;
}(root_1.HttpException));
exports.BadRequestsException = BadRequestsException;
