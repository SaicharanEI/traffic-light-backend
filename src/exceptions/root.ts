export class HttpException extends Error {
  message: string;
  errorCode: any;
  statusCode: number;
  errors: errorCode;

  constructor(
    message: string,
    errorCode: errorCode,
    statusCode: number,
    error: any
  ) {
    super(message);
    this.message = message;
    this.errorCode = errorCode;
    this.statusCode = statusCode;
    this.errors = error;
    Error.captureStackTrace(this, this.constructor);
  }
}

export enum errorCode {
  INTERNAL_EXCEPTION = 3001,
  LIGHT_NOT_FOUND = 5001,
  SCHEDULE_NOT_FOUND = 5002,
  UNPROCESSABLE_ENTITY = 2001,
}
