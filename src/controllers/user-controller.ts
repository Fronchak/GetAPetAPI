import { Request, Response } from "express";
import User from "../models/user";
import userService from "../services/user-service";

class UserController {

    public async findById(req: Request, res: Response) {
        const user = await userService.findById(req.params.id);
        return res.status(200).json(user);
    }

}

export default new UserController();