import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

interface CustomRequest extends Request {
    token: string | JwtPayload;
    username: string;
}

export default CustomRequest;