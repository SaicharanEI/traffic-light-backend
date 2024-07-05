import { Request, Response, NextFunction } from "express";
import { errorCode, HttpException } from "./exceptions/root";
import { InternalException } from "./exceptions/internal-exception";
import { ZodError } from "zod";
import { badRequestsException } from "./exceptions/bad-requests.exception";

export const errorHandler = (method: Function) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await method(req, res, next);
    } catch (error: any) {
      let exception: HttpException;
      if (error instanceof HttpException) {
        exception = error;
      } else {
        if (error instanceof ZodError) {
          exception = new badRequestsException(
            "Unprocessable entity.",
            errorCode.UNPROCESSABLE_ENTITY,
            error
          );
        } else {
          exception = new InternalException(
            "Something went wrong!",
            error,
            errorCode.INTERNAL_EXCEPTION
          );
        }
      }
      next(exception);
    }
  };
};
