import mongoose from 'mongoose';
import { NextFunction, Request, Response } from "express";
import BadRequestError from "../errors/bas-request-error";

const checkIdParam = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return next(new BadRequestError('Invalid ID'));
    }
    next();
}

export default checkIdParam;