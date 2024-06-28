class ErrorHandler extends Error {
    public statusCode: number;
  
    constructor(message: string, statusCode: number) {
      super(message);
      this.statusCode = statusCode;
  
      // Ensure stack trace is captured properly
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  export default ErrorHandler;
  