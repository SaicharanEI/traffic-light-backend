import { z } from "zod";
import { paramsSchema } from "../schema/params.schema";

export type ParamsType = z.infer<typeof paramsSchema.shape.params >;
