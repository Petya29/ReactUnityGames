import GameService from "../services/game.service";
import { NextFunction, Request, Response } from "express";

class GameController {
    async saveScore (req: Request, res: Response, next: NextFunction){
        try {
            const {
                userId,
                level,
                score,
                region
            } : {
                userId: string,
                level: number,
                score: number,
                region: string
            } = req.body;

            const gameId = req.params.gameId;

            const newScore = await GameService.saveScore(userId, gameId, level, score, region);

            return res.json(newScore)
        } catch (e) {
            next(e);
        }
    }
}

export default new GameController();