import {z} from "zod"
export const TrafficLightScheduleSchema = z.object({
    id: z.number().optional(),
    timePeriod: z.string(),
    startTime: z.string(),
    endTime: z.string(),
    redDuration: z.number().gte(0),
    yellowDuration: z.number().gte(0),
    greenDuration: z.number().gte(0),
  });
  
  export const TrafficLightSchema = z.object({
    schedules: z.array(TrafficLightScheduleSchema),
    name: z.string(),
    location: z.string(),
    currentColor: z.string(),
  });