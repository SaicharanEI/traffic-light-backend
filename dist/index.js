"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prismaClient = void 0;
const express_1 = __importDefault(require("express"));
const secrets_1 = require("./secrets");
const trafficRoute_1 = require("./routes/trafficRoute");
const client_1 = require("@prisma/client");
const error_1 = require("./middlewares/error");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.listen(secrets_1.PORT, () => { console.log(`Server is running on port ${secrets_1.PORT}`); });
app.use(express_1.default.json());
app.use((0, cors_1.default)());
exports.prismaClient = new client_1.PrismaClient({
    log: ['query']
});
app.use("/api/v1", trafficRoute_1.trafficRoute);
app.use(error_1.errorMiddleware);
app.get("/", (req, res) => {
    res.send("Hello World!");
});
