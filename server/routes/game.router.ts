import { Router } from "express";
import GameController from "../controllers/game.controller";

const gameRouter = Router();

gameRouter.post('/:gameId', GameController.saveScore);

export default gameRouter;