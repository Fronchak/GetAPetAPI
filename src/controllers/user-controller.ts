import { Request, Response } from "express";
import User from "../models/user";
import userService from "../services/user-service";
import CustomRequest from "../interfaces/custom-request";
import UserOutputDTO from "../dtos/user-output-dto";

class UserController {

    public async findById(req: Request, res: Response) {
        const user = await userService.findById(req.params.id);
        return res.status(200).json(user);
    }

    public async profile(req: Request, res: Response) {
        const username = (req as CustomRequest).username;
        const user: UserOutputDTO = await userService.profile(username);
        return res.status(200).json(user);
    }
}

export default new UserController();