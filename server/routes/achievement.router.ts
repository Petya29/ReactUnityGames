import { Router } from "express";
import achievementController from "../controllers/achievement.controller";
import AchievementController from "../controllers/achievement.controller";
import authMiddleware from "../middleware/auth.middleware";


const achievementRouter = Router();

achievementRouter.get('/get-game-achievements/:gameId', AchievementController.getGameAchievements);
achievementRouter.get('/get-user-achievements', authMiddleware, AchievementController.getUserAchievements);
achievementRouter.post('/save-user-achievement/:achievementId', authMiddleware, achievementController.saveUserAchievement);

export default achievementRouter;