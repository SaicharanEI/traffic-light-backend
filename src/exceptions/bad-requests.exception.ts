import { errorCode, HttpException } from "./root";

export class badRequestsException extends HttpException {
    constructor(message: string, errorCode:errorCode, errors?:any) {
        super(message, errorCode, 400, errors);
    }
}