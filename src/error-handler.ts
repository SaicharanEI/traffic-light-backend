import { Request, Response, NextFunction } from "express"
import { ErrorCode, HttpException } from "./exceptions/root"
import { InternalException } from "./exceptions/internal-exception"
import { ZodError } from "zod"
import { BadRequestsException } from "./exceptions/bad-requests.exception"

export const errorHandler = (method: Function) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log("error handler called")
            await method(req, res, next)
        } catch(error: any) {
            console.log(error, "error from error handler")
            let exception: HttpException;
            if( error instanceof HttpException) {
                console.log(error)
                exception = error;
            } else {
                if( error instanceof ZodError) {
                    console.log(error)
                    exception = new BadRequestsException('Unprocessable entity.', ErrorCode.UNPROCESSABLE_ENTITY, error)
                } else {
                    console.log(error)
                    exception = new InternalException('Something went wrong!', error, ErrorCode.INTERNAL_EXCEPTION)
                }
            }
            console.log(exception)
            next(exception)
        }

    }
}