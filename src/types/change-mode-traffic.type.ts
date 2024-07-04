import {z} from "zod";
import { changeModeSchema } from "../schema/change-mode.schema";



export type ChangeModeTrafficParamsType = z.infer<typeof changeModeSchema.shape.params>;
export type ChangeModeTrafficBodyType = z.infer<typeof changeModeSchema.shape.body>;

export interface ChangeTrafficLightModeType {
  id: ChangeModeTrafficParamsType;
  body: ChangeModeTrafficBodyType;
}

