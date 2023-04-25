import { NextFunction, Request, Response } from "express";
import AchievementService from "../services/achievement.service";
import GameService from "../services/game.service";

class AchievementController {
    async getGameAchievements(req: Request, res: Response, next: NextFunction){
        try {
            const gameId = req.params.gameId;

            await GameService.isGameExists(gameId);

            const gameAchievements = await AchievementService.getGameAchievements(gameId);

            return res.json(gameAchievements)
        } catch (e) {
            next(e);
        }
    }

    async getUserAchievements(req: Request, res: Response, next: NextFunction){
        try {
            const userId = req.user.id;

            const userAchievements = await AchievementService.getUserAchievements(userId);

            return res.json(userAchievements)
        } catch (e) {
            next(e);
        }
    }

    async saveUserAchievement(req: Request, res: Response, next: NextFunction){
        try {
            const userId = req.user.id;
            const achievementId = req.params.achievementId;

            const savedAchievement = await AchievementService.saveUserAchievement(userId, achievementId);

            return res.json(savedAchievement);
        } catch (e) {
            next(e);
        }
    }
}

export default new AchievementController();