import { NextFunction, Request, Response } from "express";

import { fromZodError } from "zod-validation-error";
import { BadRequestsException } from "../exceptions/bad-requests.exception";
import { Schema } from "zod";
import { ErrorCode } from "../exceptions/root";
const ValidationMiddleware = (schema : Schema
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(req.body.schedules)
      const parsedData = schema.parse(req);
      req.body = parsedData.body;
      console.log(req.body, "from validaton middleware middleware");
      next();
    } catch (err: any) {
      const error = fromZodError(err);
      console.log(error, "message from validation middleware");
    
    return next(new BadRequestsException(error.message,  ErrorCode.UNPROCESSABLE_ENTITY))
  }
  };
};

//2020-01-01T00:00:00Z

// Export the validation middleware function
export default ValidationMiddleware;
