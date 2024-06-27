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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSchedule = exports.getTrafficLightsList = exports.getTrafficLight = exports.DeleteTrafficLight = exports.updateTrafficLight = exports.AddTrafficLight = void 0;
const __1 = require("..");
const trafficlight_1 = require("../schema/trafficlight");
const root_1 = require("../exceptions/root");
const not_found_1 = require("../exceptions/not-found");
const bad_requests_1 = require("../exceptions/bad-requests");
const AddTrafficLight = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parsedBody = trafficlight_1.TrafficLightSchema.parse(req.body);
        const { name, location, currentColor, schedules } = parsedBody;
        const trafficlight = yield __1.prismaClient.trafficLight.create({
            data: {
                name,
                location,
                currentColor,
                schedules: {
                    create: schedules,
                },
            },
            include: {
                schedules: true, // Include schedules in the response
            },
        });
        res.status(201).json({
            message: "Traffic light created successfully",
            data: trafficlight,
        });
    }
    catch (error) {
        next(new bad_requests_1.BadRequestsException(error.message, error.errorCode, error.errors));
    }
});
exports.AddTrafficLight = AddTrafficLight;
const updateTrafficLight = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const trafficLightId = Number(id);
    const { name, location, currentColor, schedules } = req.body;
    try {
        yield __1.prismaClient.trafficLight.update({
            where: { id: trafficLightId },
            data: { name, location, currentColor },
        });
        // Update schedules
        for (const schedule of schedules) {
            if (schedule.id !== undefined) {
                yield __1.prismaClient.trafficLightSchedule.update({
                    where: { id: schedule.id },
                    data: {
                        timePeriod: schedule.timePeriod,
                        startTime: schedule.startTime,
                        endTime: schedule.endTime,
                        redDuration: schedule.redDuration,
                        yellowDuration: schedule.yellowDuration,
                        greenDuration: schedule.greenDuration,
                    },
                });
            }
            else {
                yield __1.prismaClient.trafficLightSchedule.create({
                    data: {
                        timePeriod: schedule.timePeriod,
                        startTime: schedule.startTime,
                        endTime: schedule.endTime,
                        redDuration: schedule.redDuration,
                        yellowDuration: schedule.yellowDuration,
                        greenDuration: schedule.greenDuration,
                        trafficLightId: trafficLightId,
                    },
                });
            }
        }
        // Fetch the updated traffic light with the latest schedules
        const trafficLightWithSchedules = yield __1.prismaClient.trafficLight.findUnique({
            where: { id: trafficLightId },
            include: {
                schedules: {
                    where: {
                        status: false,
                    },
                },
            },
        });
        res.status(200).json({
            message: "Traffic light updated successfully",
            data: trafficLightWithSchedules,
        });
    }
    catch (error) {
        next(new bad_requests_1.BadRequestsException(error.message, error.errorCode, error.errors));
    }
});
exports.updateTrafficLight = updateTrafficLight;
const DeleteTrafficLight = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const trafficlight = yield __1.prismaClient.trafficLight.update({
            where: {
                id: Number(id),
            },
            data: {
                status: true,
            },
        });
        res.status(200).json({
            message: "Traffic light deleted successfully",
            trafficlight,
        });
    }
    catch (error) {
        next(new not_found_1.NotFoundException("Traffic light not found", root_1.ErrorCode.LIGHT_NOT_FOUND));
    }
});
exports.DeleteTrafficLight = DeleteTrafficLight;
const getTrafficLight = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const trafficlight = yield __1.prismaClient.trafficLight.findUnique({
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
        });
        res.status(200).json({ data: trafficlight });
    }
    catch (error) {
        next(new not_found_1.NotFoundException("Traffic light not found", root_1.ErrorCode.LIGHT_NOT_FOUND));
    }
});
exports.getTrafficLight = getTrafficLight;
const getTrafficLightsList = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const trafficlights = yield __1.prismaClient.trafficLight.findMany({
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
        });
        res.status(200).json({ data: trafficlights });
    }
    catch (error) {
        next(new bad_requests_1.BadRequestsException(error.message, error.errorCode, error.errors));
    }
});
exports.getTrafficLightsList = getTrafficLightsList;
const deleteSchedule = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const schedule = yield __1.prismaClient.trafficLightSchedule.update({
            where: {
                id: Number(id),
            },
            data: {
                status: true,
            },
        });
        res.status(200).json({
            message: "Schedule deleted successfully",
            schedule,
        });
    }
    catch (error) {
        next(new not_found_1.NotFoundException("Traffic light not found", root_1.ErrorCode.LIGHT_NOT_FOUND));
    }
});
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
