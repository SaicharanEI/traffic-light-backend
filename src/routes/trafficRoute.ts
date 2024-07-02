import { Router } from "express";
import { AddTrafficLight, DeleteTrafficLight, changeAutomaticModeById, deleteSchedule, getTrafficLight, getTrafficLightsList, updateTrafficLightCurrentColor, updateTrafficLightDetails } from "../controllers/trafficControllers";
import { errorHandler } from "../error-handler";
import { TrafficLightSchema } from "../schema/trafficlight";
import validationMiddleware from "../middlewares/validation-middleware";

export const trafficRoute: Router = Router();

trafficRoute.post("/addtrafficlight",validationMiddleware(TrafficLightSchema) ,errorHandler(AddTrafficLight))
trafficRoute.put("/updatetrafficlight/:id", validationMiddleware(TrafficLightSchema) ,errorHandler(updateTrafficLightDetails))
trafficRoute.get("/trafficlights", errorHandler(getTrafficLightsList))
trafficRoute.get("/trafficlight/:id", errorHandler(getTrafficLight))
trafficRoute.put("/updatetrafficlightcolor/:id", updateTrafficLightCurrentColor)
trafficRoute.delete("/deleteschedule/:id", errorHandler(deleteSchedule))
trafficRoute.delete(`/deletetrafficlight/:id`, errorHandler(DeleteTrafficLight))
trafficRoute.put("/changeAutomaticModeById/:id", errorHandler(changeAutomaticModeById))