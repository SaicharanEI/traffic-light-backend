"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrafficLightSchema = exports.TrafficLightScheduleSchema = void 0;
var zod_1 = require("zod");
exports.TrafficLightScheduleSchema = zod_1.z.object({
    timePeriod: zod_1.z.string(),
    startTime: zod_1.z.string(),
    endTime: zod_1.z.string(),
    redDuration: zod_1.z.number(),
    yellowDuration: zod_1.z.number(),
    greenDuration: zod_1.z.number(),
});
exports.TrafficLightSchema = zod_1.z.object({
    name: zod_1.z.string(),
    location: zod_1.z.string(),
    currentColor: zod_1.z.string(),
    schedules: zod_1.z.array(exports.TrafficLightScheduleSchema),
});
