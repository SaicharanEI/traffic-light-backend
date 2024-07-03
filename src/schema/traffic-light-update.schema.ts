import {z} from "zod"

export const TrafficLightUpdateSchema = z.object({
    params: z.object({
        id: z.string().regex(/^\d+$/, "Invalid ID format"),
    }), 
    body: z.object({
        name: z.string().trim().min(1).max(100),
        location: z.string().trim().min(1).max(100),
        schedules: z.array(z.object({
            id: z.number().optional(),
            timePeriod: z.string(),
            startTime: z.string().datetime(),
            endTime: z.string().datetime(),
            redDuration: z.number(),
            yellowDuration: z.number(),
            greenDuration: z.number(),
        })
        )
    })
  });

