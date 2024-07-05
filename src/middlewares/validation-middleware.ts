import { NextFunction, Request, Response } from "express";
import { fromZodError } from "zod-validation-error";
import { Schema } from "zod";

import { badRequestsException } from "../exceptions/bad-requests.exception";
import { errorCode } from "../exceptions/root";

const validationMiddleware = (schema: Schema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsedData = schema.parse(req);
      req.body = parsedData.body;
      next();
    } catch (err: any) {
      const error = fromZodError(err);
      return next(
        new badRequestsException(error.message, errorCode.UNPROCESSABLE_ENTITY)
      );
    }
  };
};

export default validationMiddleware;
