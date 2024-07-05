import { z } from "zod";

import { trafficLightUpdateSchema } from "../schema/traffic-light-update.schema";

export type UpdateTrafficParamsType = z.infer<
  typeof trafficLightUpdateSchema.shape.params
>;
export type UpdateTrafficBodyType = z.infer<
  typeof trafficLightUpdateSchema.shape.body
>;

export interface UpdateTrafficType {
  id: UpdateTrafficParamsType;
  body: UpdateTrafficBodyType;
}
