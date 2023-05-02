import { Request, Response } from "express";
import CustomRequest from "../interfaces/custom-request";
import PetOutputDTO from "../dtos/pet/pet-output-dto";
import petService from "../services/pet-service";
import ValidationError from "../errors/validation-error";
import FieldError from "../errors/field-error";


class PetController {

    public async save(req: Request, res: Response) {
        const images: Express.Multer.File[] | undefined = req.files as Express.Multer.File[] | undefined;
        console.log('images', images);
        if(!images || images.length === 0) {
            throw new ValidationError([new FieldError('images', 'Images is required')]);
        }
        const photos = images.map((image) => image.filename);
        const username = (req as CustomRequest).username;
        const outputDTO: PetOutputDTO = await petService.save(req.body, username, photos);
        return res.status(201).json(outputDTO);
    }

    public async findAll(req: Request, res: Response) {
        const dtos: PetOutputDTO[] = await petService.findAll();
        return res.status(200).json(dtos);
    }

}

export default new PetController();