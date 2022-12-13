import { Router } from "express";
import userController from "../controllers/user.controller";
import validate from "../validation";
import { registrationSchema } from "../validation/schemas";

const userRouter = Router();

userRouter.post('/registration', userController.registration);

export default userRouter;