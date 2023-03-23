import { Router } from "express";
import GameController from "../controllers/game.controller";
import authMiddleware from "../middleware/auth.middleware";

const gameRouter = Router();

gameRouter.post('/save-score/:gameId', authMiddleware, GameController.saveScore);

export default gameRouter;