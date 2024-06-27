import {z} from "zod"
export const TrafficLightScheduleSchema = z.object({
    timePeriod: z.string(),
    startTime: z.string(),
    endTime: z.string(),
    redDuration: z.number().gte(0),
    yellowDuration: z.number().gte(0),
    greenDuration: z.number().gte(0),
  });
  
  export const TrafficLightSchema = z.object({
    name: z.string(),
    location: z.string().email(),
    currentColor: z.string(),
    schedules: z.array(TrafficLightScheduleSchema),
  });