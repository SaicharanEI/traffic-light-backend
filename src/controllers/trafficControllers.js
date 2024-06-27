"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSchedule = exports.getTrafficLightsList = exports.getTrafficLight = exports.DeleteTrafficLight = exports.updateTrafficLight = exports.AddTrafficLight = void 0;
var __1 = require("..");
var trafficlight_1 = require("../schema/trafficlight");
var root_1 = require("../exceptions/root");
var not_found_1 = require("../exceptions/not-found");
var bad_requests_1 = require("../exceptions/bad-requests");
var AddTrafficLight = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var parsedBody, name_1, location_1, currentColor, schedules, trafficlight, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                parsedBody = trafficlight_1.TrafficLightSchema.parse(req.body);
                name_1 = parsedBody.name, location_1 = parsedBody.location, currentColor = parsedBody.currentColor, schedules = parsedBody.schedules;
                return [4 /*yield*/, __1.prismaClient.trafficLight.create({
                        data: {
                            name: name_1,
                            location: location_1,
                            currentColor: currentColor,
                            schedules: {
                                create: schedules,
                            },
                        },
                        include: {
                            schedules: true, // Include schedules in the response
                        },
                    })];
            case 1:
                trafficlight = _a.sent();
                res.status(201).json({
                    message: "Traffic light created successfully",
                    data: trafficlight,
                });
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                next(new bad_requests_1.BadRequestsException(error_1.message, error_1.errorCode, error_1.errors));
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.AddTrafficLight = AddTrafficLight;
var updateTrafficLight = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, trafficLightId, _a, name, location, currentColor, schedules, _i, schedules_1, schedule, trafficLightWithSchedules, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = req.params.id;
                trafficLightId = Number(id);
                _a = req.body, name = _a.name, location = _a.location, currentColor = _a.currentColor, schedules = _a.schedules;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 10, , 11]);
                return [4 /*yield*/, __1.prismaClient.trafficLight.update({
                        where: { id: trafficLightId },
                        data: { name: name, location: location, currentColor: currentColor },
                    })];
            case 2:
                _b.sent();
                _i = 0, schedules_1 = schedules;
                _b.label = 3;
            case 3:
                if (!(_i < schedules_1.length)) return [3 /*break*/, 8];
                schedule = schedules_1[_i];
                if (!(schedule.id !== undefined)) return [3 /*break*/, 5];
                return [4 /*yield*/, __1.prismaClient.trafficLightSchedule.update({
                        where: { id: schedule.id },
                        data: {
                            timePeriod: schedule.timePeriod,
                            startTime: schedule.startTime,
                            endTime: schedule.endTime,
                            redDuration: schedule.redDuration,
                            yellowDuration: schedule.yellowDuration,
                            greenDuration: schedule.greenDuration,
                        },
                    })];
            case 4:
                _b.sent();
                return [3 /*break*/, 7];
            case 5: return [4 /*yield*/, __1.prismaClient.trafficLightSchedule.create({
                    data: {
                        timePeriod: schedule.timePeriod,
                        startTime: schedule.startTime,
                        endTime: schedule.endTime,
                        redDuration: schedule.redDuration,
                        yellowDuration: schedule.yellowDuration,
                        greenDuration: schedule.greenDuration,
                        trafficLightId: trafficLightId,
                    },
                })];
            case 6:
                _b.sent();
                _b.label = 7;
            case 7:
                _i++;
                return [3 /*break*/, 3];
            case 8: return [4 /*yield*/, __1.prismaClient.trafficLight.findUnique({
                    where: { id: trafficLightId },
                    include: {
                        schedules: {
                            where: {
                                status: false,
                            },
                        },
                    },
                })];
            case 9:
                trafficLightWithSchedules = _b.sent();
                res.status(200).json({
                    message: "Traffic light updated successfully",
                    data: trafficLightWithSchedules,
                });
                return [3 /*break*/, 11];
            case 10:
                error_2 = _b.sent();
                next(new bad_requests_1.BadRequestsException(error_2.message, error_2.errorCode, error_2.errors));
                return [3 /*break*/, 11];
            case 11: return [2 /*return*/];
        }
    });
}); };
exports.updateTrafficLight = updateTrafficLight;
var DeleteTrafficLight = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, trafficlight, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, __1.prismaClient.trafficLight.update({
                        where: {
                            id: Number(id),
                        },
                        data: {
                            status: true,
                        },
                    })];
            case 2:
                trafficlight = _a.sent();
                res.status(200).json({
                    message: "Traffic light deleted successfully",
                    trafficlight: trafficlight,
                });
                return [3 /*break*/, 4];
            case 3:
                error_3 = _a.sent();
                next(new not_found_1.NotFoundException("Traffic light not found", root_1.ErrorCode.LIGHT_NOT_FOUND));
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.DeleteTrafficLight = DeleteTrafficLight;
var getTrafficLight = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, trafficlight, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, __1.prismaClient.trafficLight.findUnique({
                        where: {
                            id: Number(id),
                        },
                        include: {
                            schedules: {
                                where: {
                                    status: false,
                                },
                            },
                        },
                    })];
            case 2:
                trafficlight = _a.sent();
                res.status(200).json({ data: trafficlight });
                return [3 /*break*/, 4];
            case 3:
                error_4 = _a.sent();
                next(new not_found_1.NotFoundException("Traffic light not found", root_1.ErrorCode.LIGHT_NOT_FOUND));
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getTrafficLight = getTrafficLight;
var getTrafficLightsList = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var trafficlights, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, __1.prismaClient.trafficLight.findMany({
                        where: {
                            status: false,
                        },
                        include: {
                            schedules: {
                                where: {
                                    status: false,
                                },
                            },
                        },
                    })];
            case 1:
                trafficlights = _a.sent();
                res.status(200).json({ data: trafficlights });
                return [3 /*break*/, 3];
            case 2:
                error_5 = _a.sent();
                next(new bad_requests_1.BadRequestsException(error_5.message, error_5.errorCode, error_5.errors));
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getTrafficLightsList = getTrafficLightsList;
var deleteSchedule = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, schedule, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, __1.prismaClient.trafficLightSchedule.update({
                        where: {
                            id: Number(id),
                        },
                        data: {
                            status: true,
                        },
                    })];
            case 2:
                schedule = _a.sent();
                res.status(200).json({
                    message: "Schedule deleted successfully",
                    schedule: schedule,
                });
                return [3 /*break*/, 4];
            case 3:
                error_6 = _a.sent();
                next(new not_found_1.NotFoundException("Traffic light not found", root_1.ErrorCode.LIGHT_NOT_FOUND));
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deleteSchedule = deleteSchedule;
// export const updateTrafficLightCurrentColor = async (
//   req: Request,
//   res: Response
// ) => {
//   const { id } = req.params;
//   const { currentColor } = req.body;
//   const trafficlight = await prismaClient.trafficLight.update({
//     where: {
//       id: Number(id),
//     },
//     data: {
//       currentColor,
//     },
//   });
//   res.status(200).json({
//     message: "Traffic light updated successfully",
//     data: trafficlight,
//   });
// };
