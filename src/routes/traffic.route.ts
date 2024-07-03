import { Router } from "express";
import { errorHandler } from "../error-handler";
import { AddTrafficLight, ChangeTrafficLightModeById, DeleteSchedule, DeleteTrafficLight, GetTrafficLightById, GetTrafficLightsList, UpdateTrafficLight } from "../controllers/traffic.controller";
import ValidationMiddleware from "../middlewares/validation-middleware";
import { TrafficLightPostSchema } from "../schema/traffic-light-post.schema";
import { TrafficLightUpdateSchema } from "../schema/traffic-light-update.schema";

const trafficRoute: Router = Router();

trafficRoute.get("/", errorHandler(GetTrafficLightsList))
trafficRoute.get("/:id", errorHandler(GetTrafficLightById))
trafficRoute.post("/",ValidationMiddleware(TrafficLightPostSchema) ,errorHandler(AddTrafficLight))
trafficRoute.put("/:id", ValidationMiddleware(TrafficLightUpdateSchema) ,errorHandler(UpdateTrafficLight))
trafficRoute.delete("/:id", errorHandler(DeleteTrafficLight))

trafficRoute.delete("/schedule/:id", errorHandler(DeleteSchedule))
trafficRoute.put("/:id/change-mode", errorHandler(ChangeTrafficLightModeById))


export { trafficRoute };
