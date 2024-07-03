import { z } from "zod";

import { trafficLightPostSchema } from "../schema/traffic-light-post.schema";

export type CreateTrafficType = z.infer<typeof trafficLightPostSchema>;