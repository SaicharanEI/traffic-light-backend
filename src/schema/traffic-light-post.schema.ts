import {z} from "zod"
export const TrafficLightPostSchema = z.object({
    body: z.object({
        name: z.string().trim().min(1).max(100),
        location: z.string().trim().min(1).max(100),
        currentColor: z.string().optional(),
        schedules: z.array(z.object({
            timePeriod: z.string(),
            startTime: z.string().datetime(),
            endTime: z.string().datetime(),
            redDuration: z.number(),
            yellowDuration: z.number(),
            greenDuration: z.number(),
        }))
    })
});

