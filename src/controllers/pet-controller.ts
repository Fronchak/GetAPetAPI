import { Request, Response } from "express";
import CustomRequest from "../interfaces/custom-request";
import PetOutputDTO from "../dtos/pet/pet-output-dto";
import petService from "../services/pet-service";


class PetController {

    public async save(req: Request, res: Response) {
        const username = (req as CustomRequest).username;
        const outputDTO: PetOutputDTO = await petService.save(req.body, username);
        return res.status(201).json(outputDTO);
    }

}

export default new PetController();