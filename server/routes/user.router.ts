import { Router } from "express";
import userController from "../controllers/user.controller";
import validate from "../validation";
import { registrationSchema } from "../validation/schemas";

const userRouter = Router();

userRouter.post('/registration', validate(registrationSchema), userController.registration);

userRouter.get('/activate/:link', userController.activate);

export default userRouter;