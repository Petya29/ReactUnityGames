import ApiError from "../error/api.error";
import prisma from "../prisma/prisma";

class GameService {
    async isGameExists(gameId: string) {
        const isGameExists = await prisma.game.findUnique({
            where: {
                id: gameId
            }
        });

        if(!isGameExists) {
            throw ApiError.badRequest('Game with this id does not exist', {
                msg: 'Game with this id does not exist',
                param: 'gameId'
            });
        }

        return isGameExists;
    }

    async saveScore(
        userId: string,
        gameId: string,
        level: number,
        score: number,
        region: string
        ) {
            await this.isGameExists(gameId);

            const newScore = await prisma.userScores.upsert({
                where: {
                    userId: userId
                },
                update: {
                    level: Number(level),
                    score: {
                        increment: Number(score)
                    }
                },
                create: {
                    userId: userId,
                    gameId: gameId,
                    level: Number(level) < 0 ? 0 : Number(level),
                    score: Number(score),
                    region: region
                }
            })

            return newScore;
    }

    async getScore(userId: string, gameId: string){
        await this.isGameExists(gameId);

        const score = await prisma.userScores.findUnique({
            where: {
                userId: userId
            }
        })

        return score;
    }
}

export default new GameService();