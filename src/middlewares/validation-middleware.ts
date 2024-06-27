import { NextFunction, Request, Response } from "express";

import { fromZodError } from "zod-validation-error";
import { BadRequestsException } from "../exceptions/bad-requests";
const validationMiddleware = (schema : any) => (req: Response, res: Request, next: NextFunction) => {
  try {

    console.log("validation middleware called")
    const parsedData = schema.parse({
      body: req.body,
    });
    const { body } = parsedData;

    req.body = body;

    next();
  } catch (err: any) {
    const error = fromZodError(err);
    new BadRequestsException(error.message, err.errorCode, err.errors)
}
};

// Export the validation middleware function
export default validationMiddleware;