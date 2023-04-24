import { NextFunction, Request, Response } from "express";
import ValidationErrorResponse from "./validation-error-response";
import ValidationError from "../errors/validation-error";
import ApiError from "../errors/api-error";
import ErrorResponse from "./error-response";

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(err);
    if(err instanceof ApiError) {
        if(err instanceof ValidationError) {
            const status = 422;
            const response = new ValidationErrorResponse(err.error, err.message, status, err.errors);
            return res.status(status).json(response);
        }
        else {
            const response = buildResponse(err);
            return res.status(err.status).json(response);
        }
    }
    else {
        const response = new ErrorResponse('Internal server error', 'Something go wrong', 500);
        return res.status(500).json(response);
    }
}

const buildResponse = (err: ApiError): ErrorResponse => {
    return new ErrorResponse(err.error, err.message, err.status);
}

export default errorHandler;