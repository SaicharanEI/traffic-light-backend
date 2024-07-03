import { z } from "zod";

import { trafficLightUpdateSchema } from "../schema/traffic-light-update.schema";

export type UpdateTrafficType = z.infer<typeof trafficLightUpdateSchema>;