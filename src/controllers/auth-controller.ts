import { Request, Response } from "express";
import authService from "../services/auth-service";
import TokenOutputDTO from "../dtos/auth/token-output-dto";

class AuthController {

    public async register(req: Request, res: Response) {
        const token: TokenOutputDTO = await authService.register(req.body);
        return res.status(201).json(token);
    }

    public async login(req: Request, res: Response) {
        const token: TokenOutputDTO = await authService.login(req.body);
        return res.status(200).json(token);
    }
}

export default new AuthController();