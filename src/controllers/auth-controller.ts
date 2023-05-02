import { Request, Response } from "express";
import authService from "../services/auth-service";
import TokenOutputDTO from "../dtos/auth/token-output-dto";
import CustomRequest from "../interfaces/custom-request";

class AuthController {

    public async register(req: Request, res: Response) {
        const token: TokenOutputDTO = await authService.register(req.body);
        return res.status(201).json(token);
    }

    public async login(req: Request, res: Response) {
        const token: TokenOutputDTO = await authService.login(req.body);
        return res.status(200).json(token);
    }

    public async update(req: Request, res: Response) {
        const username = (req as CustomRequest).username;
        let image;
        if(req.file) {
            image = req.file.filename;
        }
        console.log('req.file', req.file);
        console.log('image', image);
        await authService.update(req.body, req.params.id, username, image);
        return res.sendStatus(204);
    }
}

export default new AuthController();