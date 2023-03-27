import ApiError from "../error/api.error";
import prisma from "../prisma/prisma";


class AchievementService {
    async isAchievementExists(achievementId: string){
        const isAchievementExists = await prisma.achievement.findUnique({
            where: {
                id: achievementId
            }
        });

        if(!isAchievementExists){
            throw ApiError.badRequest('Achievement with this id does not exist', {
                msg: 'Achievement with this id does not exist',
                param: 'achievementId'
            });
        }

        return isAchievementExists;
    }

    async isAchievementSaved(achievementId: string, userId: string){
        const isAchievementSaved = await prisma.userAchievements.findUnique({
            where: {
                userId_achievementId: {
                    achievementId: achievementId,
                    userId: userId
                }
            }
        }); 

        if(isAchievementSaved){
            throw ApiError.badRequest('This achievement is already saved for specified user', {
                msg: 'This achievement is already saved for specified user',
                params: 'userId, achievementId'
            });
        }

        return isAchievementSaved;
    }

    async getGameAchievements(gameId: string){
        const gameAchievements = await prisma.achievement.findMany({
            where: {
                gameId: gameId
            }
        });

        if(gameAchievements.length === 0) return {"msg" : "No achievements found for this game"};

        return gameAchievements;
    }

    async getUserAchievements(userId: string){
        const userAchievements = await prisma.userAchievements.findMany({
            where: {
                userId: userId
            }
        });

        if(userAchievements.length === 0) return {"msg" : "No achievements found for this user"};

        return userAchievements;
    }

    async saveUserAchievement(userId: string, achievementId: string){
        await this.isAchievementExists(achievementId)
        await this.isAchievementSaved(achievementId, userId)

        const savedAchievement = await prisma.userAchievements.create({
            data: {
                userId: userId,
                achievementId: achievementId
            }
        });

        return savedAchievement;
    }
}

export default new AchievementService();