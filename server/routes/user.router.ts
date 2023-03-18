import { Router } from "express";
import UserController from "../controllers/user.controller";
import authMiddleware from "../middleware/auth.middleware";
import validate from "../validation";
import { editSchema, loginSchema, registrationSchema } from "../validation/schemas";

const userRouter = Router();

userRouter.post('/registration', validate(registrationSchema), UserController.registration);
userRouter.post('/login', validate(loginSchema), UserController.login);
userRouter.post('/logout', UserController.logout);
userRouter.post('/edit', authMiddleware, validate(editSchema), UserController.edit);

userRouter.get('/activate/:link', UserController.activate);
userRouter.get('/refresh', UserController.refresh);

export default userRouter;