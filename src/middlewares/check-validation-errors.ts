import { NextFunction, Request, Response } from "express";
import { validationResult } from 'express-validator';
import ValidationError from "../errors/validation-error";
import FieldError from "../errors/field-error";

const checkValidationErrors = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        const fieldErrors = errors.array().map((err) => new FieldError(err.param, err.msg));
        return next(new ValidationError(fieldErrors));
    }
    next();
}

export default checkValidationErrors;