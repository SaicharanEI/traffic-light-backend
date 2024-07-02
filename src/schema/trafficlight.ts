import {z} from "zod"
export const TrafficLightScheduleSchema = z.object({
    id: z.number().optional(),
    isAutomatic: z.boolean().optional(),
    timePeriod: z.string().trim(),
    startTime: z.string().trim(),
    endTime: z.string().trim(),
    redDuration: z.number().gte(0),
    yellowDuration: z.number().gte(0),
    greenDuration: z.number().gte(0),
  });
  
  export const TrafficLightSchema = z.object({
    schedules: z.array(TrafficLightScheduleSchema),
    name: z.string().trim().min(1).max(100),
    location: z.string().trim().min(1).max(100),
    currentColor: z.string().trim().min(1).max(100),
  });