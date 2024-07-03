import { NextFunction, Request, Response } from "express";
import { prismaClient } from "../prisma";
import { CreateTrafficType } from "../types/create-traffic.type";
import { UpdateTrafficType } from "../types/update-traffic.type";

export const addTrafficLight = async (
  req: Request<null, null, CreateTrafficType["body"]>,
  res: Response,
  next: NextFunction
) => {
    const { name, location, currentColor, schedules } = req.body;
    const trafficlight = await prismaClient.trafficLight.create({
      data: {
        name,
        location,
        currentColor: currentColor ?? "red",
        schedules: {
          create: schedules,
        },
      },
      include: {
        schedules: true, // Include schedules in the response
      },
    });

    res.status(201).json({
      message: "Traffic light created successfully",
      data: trafficlight,
    });
};

export const updateTrafficLight = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

    const trafficLightId = Number(id);
    const { name, location, currentColor, schedules } = req.body;
    await prismaClient.trafficLight.update({
      where: { id: trafficLightId },
      data: { name, location, currentColor },
    });
    
    // Update schedules
    for (const schedule of schedules) {
      if (schedule.id !== undefined) {
        await prismaClient.trafficLightSchedule.update({
          where: { id: schedule.id },
          data: {
            timePeriod: schedule.timePeriod,
            startTime: schedule.startTime,
            endTime: schedule.endTime,
            redDuration: schedule.redDuration,
            yellowDuration: schedule.yellowDuration,
            greenDuration: schedule.greenDuration,
          },
        });
      } else {
        await prismaClient.trafficLightSchedule.create({
          data: {
            timePeriod: schedule.timePeriod,
            startTime: schedule.startTime,
            endTime: schedule.endTime,
            redDuration: schedule.redDuration,
            yellowDuration: schedule.yellowDuration,
            greenDuration: schedule.greenDuration,
            trafficLightId: trafficLightId,
          },
        });
      }
    }

    // Fetch the updated traffic light with the latest schedules
    const trafficLightWithSchedules =
      await prismaClient.trafficLight.findUnique({
        where: { id: trafficLightId },
        include: {
          schedules: {
            where: {
              status: false,
            },
          },
        },
      });

    
    res.status(200).json({
      message: "Traffic light updated successfully",
      data: trafficLightWithSchedules,
    });
  
};

export const deleteTrafficLight = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
    const trafficlight = await prismaClient.trafficLight.update({
      where: {
        id: Number(id),
      },
      data: {
        status: true,
      },
    });
    res.status(200).json({
      message: "Traffic light deleted successfully",
      trafficlight,
    });
  
};

export const getTrafficLightById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
    const trafficlight = await prismaClient.trafficLight.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        schedules: {
          where: {
            status: false,
          },
        },
      },
    });
    res.status(200).json({ data: trafficlight });

};

export const getTrafficLightsList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
    const trafficlights = await prismaClient.trafficLight.findMany({
      where: {
        status: false,
      },
      include: {
        schedules: {
          where: {
            status: false,
          },
        },
      },
    });
    res.status(200).json({ data: trafficlights });
  
};

export const deleteSchedule = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
    const schedule = await prismaClient.trafficLightSchedule.update({
      where: {
        id: Number(id),
      },
      data: {
        status: true,
      },
    });
    res.status(200).json({
      message: "Schedule deleted successfully",
      schedule,
    });
};


export const changeTrafficLightModeById = async (
  req: Request,
  res: Response
)=>{
  const { id } = req.params;
  const { mode, color} = req.body;
  const time = mode === true? 10 : 0
  console.log(id, color,mode,  "change traffic light called");
  const trafficlight = await prismaClient.trafficLight.update({
    where: {
      id: Number(id),
    },
    data: {
      isAutomatic: mode,
      currentColor: color,
      timeRemaining: time
    },
  });
  res.status(200).json({
    message: "Traffic light state changed successfully",
    data: trafficlight,
  });
}



// export const updateTrafficLightCurrentColor = async (
//   req: Request,
//   res: Response
// ) => {
//   const { id } = req.params;
//   const { color } = req.body;
//   console.log(id, color,  "update traffic light called");
//   const trafficlight = await prismaClient.trafficLight.update({
//     where: {
//       id: Number(id),
//     },
//     data: {
//       currentColor: color?.toString(),
//     },
//   });
//   res.status(200).json({
//     message: "Traffic light updated successfully",
//     data: trafficlight,
//   });
// };