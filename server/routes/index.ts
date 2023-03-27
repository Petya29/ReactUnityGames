import { Router } from "express";
import userRouter from "./user.router";
import gameRouter from "./game.router";
import achievementRouter from "./achievement.router";

const router = Router();

router.use('/user', userRouter);
router.use('/game', gameRouter);
router.use('/achievement', achievementRouter);

export default router;