import { Router } from "express";
import userInputValidator from "../validations/user/user-input-validator";
import checkValidationErrors from "../middlewares/check-validation-errors";
import resolver from "./controller-adapter";
import authController from "../controllers/auth-controller";
import userInsertValidator from "../validations/user/user-insert-validator";
import checkToken from "../middlewares/check-token";
import checkIdParam from "../middlewares/check-id-param";
import userUpdateValidator from "../validations/user/user-update-validator";
import imageUpload from "../utils/image-upload";

const authRoutes: Router = Router();

authRoutes.post('/register',
    userInputValidator,
    userInsertValidator,
    checkValidationErrors,
    resolver(authController.register));
authRoutes.post('/login', resolver(authController.login));
authRoutes.put('/update', 
    checkToken,
    imageUpload.single('image'),
    userInputValidator,
    userUpdateValidator,
    checkValidationErrors,
    resolver(authController.update));

export default authRoutes;