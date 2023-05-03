import { Router } from "express";
import checkToken from "../middlewares/check-token";
import resolver from "./controller-adapter";
import petController from "../controllers/pet-controller";
import checkValidationErrors from "../middlewares/check-validation-errors";
import petInputValidator from "../validations/pet/pet-input-validator";
import imageUpload from "../utils/image-upload";
import checkIdParam from "../middlewares/check-id-param";

const petRoutes = Router();

petRoutes.post('/', 
    checkToken,
    imageUpload.array('images'),
    petInputValidator,
    checkValidationErrors,
    resolver(petController.save));

petRoutes.get('/my-pets',
    checkToken,
    resolver(petController.findMyPets));
petRoutes.get('/my-adoptions', 
    checkToken,
    resolver(petController.findMyAdoptions));
petRoutes.get('/:id', 
    checkToken,
    checkIdParam,
    resolver(petController.findById));
petRoutes.get('/', resolver(petController.findAll));
petRoutes.delete('/:id',
    checkToken,
    checkIdParam,
    resolver(petController.removeById));

export default petRoutes;