import {z} from "zod"
import { trafficLightPostSchema } from "./traffic-light-post.schema";

export const trafficLightUpdateSchema = z.object({
  params: z.object({
    id: z.string().regex(/^\d+$/, "Invalid ID format"),
  }),
  body: trafficLightPostSchema.shape.body
});

