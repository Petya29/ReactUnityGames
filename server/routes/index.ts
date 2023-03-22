import { Router } from "express";
import userRouter from "./user.router";
import gameRouter from "./game.router";

const router = Router();

router.use('/user', userRouter);
router.use('/game', gameRouter);

export default router;