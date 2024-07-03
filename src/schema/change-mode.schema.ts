import { z } from "zod";

export const changeModeSchema = z.object({
    params: z.object({
       id: z.string().regex(/^\d+$/, "Invalid ID format"),
     }),
     body : z.object({
        mode: z.boolean(),
        color: z.string().optional()
     })
    })