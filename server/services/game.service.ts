import ApiError from "../error/api.error";
import prisma from "../prisma/prisma";

class GameService {
    async isGameExists(gameId: string) {
        const isGameExists = await prisma.game.findUnique({
            where: {
                id: gameId
            }
        });

        if (!isGameExists) {
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
                userId_gameId_region: {
                    userId: userId,
                    gameId: gameId,
                    region: region
                }
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
                level: Number(level),
                score: Number(score),
                region: region
            }
        });

        return newScore;
    }

    async getScore(userId: string, region: string, gameId: string) {
        await this.isGameExists(gameId);

        const score = await prisma.userScores.findUnique({
            where: {
                userId_gameId_region: {
                    userId: userId,
                    gameId: gameId,
                    region: region
                }
            }
        })

        return score;
    }

    async getManyScores(gameId: string, region: string){
        await this.isGameExists(gameId);

        const scores = await prisma.userScores.findMany({
            where: {
                gameId: gameId,
                region: region
            },
            take: 15
        });

        return scores;
    }

    async getGames() {
        return await prisma.game.findMany();
    }
}

export default new GameService();