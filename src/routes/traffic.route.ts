import { Router } from "express";
import { errorHandler } from "../error-handler";
import validationMiddleware from "../middlewares/validation-middleware";
import { trafficLightPostSchema } from "../schema/traffic-light-post.schema";
import { trafficLightUpdateSchema } from "../schema/traffic-light-update.schema";
import { paramsSchema } from "../schema/params.schema";
import { changeModeSchema } from "../schema/change-mode.schema";
import { addTrafficLight, changeTrafficLightModeById, deleteSchedule, deleteTrafficLight, getTrafficLightById, getTrafficLightsList, updateTrafficLight } from "../controllers/traffic.controller";

const trafficRoute: Router = Router();

trafficRoute.get("/", errorHandler(getTrafficLightsList))
trafficRoute.get("/:id", validationMiddleware(paramsSchema) , errorHandler(getTrafficLightById))
trafficRoute.post("/", validationMiddleware(trafficLightPostSchema) ,errorHandler(addTrafficLight))
trafficRoute.put("/:id", validationMiddleware(trafficLightUpdateSchema) ,errorHandler(updateTrafficLight))
trafficRoute.delete("/:id", validationMiddleware(paramsSchema), errorHandler(deleteTrafficLight))

trafficRoute.delete("/schedule/:id", validationMiddleware(paramsSchema), errorHandler(deleteSchedule))
trafficRoute.put("/:id/change-mode", validationMiddleware(changeModeSchema), errorHandler(changeTrafficLightModeById))


export { trafficRoute };
