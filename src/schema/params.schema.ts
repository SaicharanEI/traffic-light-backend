import { z } from "zod";

export const paramsSchema = z.object({
   params: z.object({
      id: z.string().regex(/^\d+$/, "Invalid ID format"),
    }),
   })