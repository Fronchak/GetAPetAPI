import { Request, Response } from "express";
import authService from "../services/auth-service";


class AuthController {

    public async register(req: Request, res: Response) {
        await authService.register(req.body);
        return res.status(201).json({});
    }
}

export default new AuthController();