import { NextFunction, Request, Response } from "express";

import { fromZodError } from "zod-validation-error";
import { BadRequestsException } from "../exceptions/bad-requests";
import ErrorHandler from "../utils/ErrorHandler";
import { Schema } from "zod";
const validationMiddleware = (schema : Schema
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsedData = schema.parse(req.body);
      req.body = parsedData;
      console.log(req.body, "from validaton middleware middleware");
      next();
    } catch (err: any) {
      const error = fromZodError(err);
      console.log(error.message, "message from validation middleware");
      return next(new ErrorHandler(error.message, 400));
    }
  };
};

// Export the validation middleware function
export default validationMiddleware;
