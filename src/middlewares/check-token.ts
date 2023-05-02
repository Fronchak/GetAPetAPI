import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import UnauthorizedError from '../errors/unauthorized-error';
import User from '../models/user';
import CustomRequest from '../interfaces/custom-request';

const checkToken = async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    const authHeaders = req.headers.authorization;
    if(authHeaders && authHeaders.startsWith("Bearer ")) {
        const token = authHeaders.substring(7);
        try {
            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || '')
            const { username } = (decoded as JwtPayload);
            const user = await User.findOne({ 'email': username });
            if(!user) {
                throw new UnauthorizedError();
            }
            (req as CustomRequest).username = user.email;
            return next();
        }
        catch(e) {
            next(new UnauthorizedError());
        }  
    }
    else {
        next(new UnauthorizedError())
    }
}

export default checkToken;
