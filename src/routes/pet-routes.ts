import { Router } from "express";
import checkToken from "../middlewares/check-token";
import resolver from "./controller-adapter";
import petController from "../controllers/pet-controller";
import checkValidationErrors from "../middlewares/check-validation-errors";
import petInputValidator from "../validations/pet/pet-input-validator";
import imageUpload from "../utils/image-upload";

const petRoutes = Router();

petRoutes.post('/', 
    imageUpload.single('image'),
    checkToken,
    petInputValidator,
    checkValidationErrors,
    resolver(petController.save));

export default petRoutes;