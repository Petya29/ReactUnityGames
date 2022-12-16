import { Router } from "express";
import UserController from "../controllers/user.controller";
import validate from "../validation";
import { loginSchema, registrationSchema } from "../validation/schemas";

const userRouter = Router();

userRouter.post('/registration', validate(registrationSchema), UserController.registration);
userRouter.post('/login', validate(loginSchema), UserController.login);
userRouter.post('/logout', UserController.logout);

userRouter.get('/activate/:link', UserController.activate);
userRouter.get('/refresh', UserController.refresh);

export default userRouter;