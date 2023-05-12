import { Router } from "express";
import checkToken from "../middlewares/check-token";
import checkIdParam from "../middlewares/check-id-param";
import resolver from "./controller-adapter";
import userController from "../controllers/user-controller";

const userRoutes = Router();

userRoutes.get('/profile',
    checkToken,
    resolver(userController.profile));
userRoutes.get('/:id', 
    checkToken,
    checkIdParam,
    resolver(userController.findById));


export default userRoutes;