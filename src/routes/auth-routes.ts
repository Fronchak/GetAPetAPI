import { Router } from "express";
import userInputValidator from "../validations/user/user-input-validator";
import checkValidationErrors from "../middlewares/check-validation-errors";
import resolver from "./controller-adapter";
import authController from "../controllers/auth-controller";
import userInsertValidator from "../validations/user/user-insert-validator";

const authRoutes: Router = Router();

authRoutes.post('/register',
    userInputValidator,
    userInsertValidator,
    checkValidationErrors,
    resolver(authController.register));
authRoutes.post('/login', resolver(authController.login));

export default authRoutes;