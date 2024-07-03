import { Router } from "express";
import { trafficRoute } from "./traffic.route";

export const rootRouter: Router = Router()

rootRouter.use("/traffic-lights", trafficRoute);
rootRouter.use("/schedules", trafficRoute);