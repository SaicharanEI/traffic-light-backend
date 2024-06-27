"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trafficRoute = void 0;
var express_1 = require("express");
var trafficControllers_1 = require("../controllers/trafficControllers");
var error_handler_1 = require("../error-handler");
exports.trafficRoute = (0, express_1.Router)();
exports.trafficRoute.post("/addtrafficlight", (0, error_handler_1.errorHandler)(trafficControllers_1.AddTrafficLight));
exports.trafficRoute.put("/updatetrafficlight/:id", (0, error_handler_1.errorHandler)(trafficControllers_1.updateTrafficLight));
exports.trafficRoute.get("/trafficlights", (0, error_handler_1.errorHandler)(trafficControllers_1.getTrafficLightsList));
exports.trafficRoute.get("/trafficlight/:id", (0, error_handler_1.errorHandler)(trafficControllers_1.getTrafficLight));
// trafficRoute.put("/updatetrafficlightcolor/:id", errorHandler(updateTrafficLightCurrentColor))
exports.trafficRoute.delete("/deleteschedule/:id", (0, error_handler_1.errorHandler)(trafficControllers_1.deleteSchedule));
exports.trafficRoute.delete("/deletetrafficlight/:id", (0, error_handler_1.errorHandler)(trafficControllers_1.DeleteTrafficLight));
