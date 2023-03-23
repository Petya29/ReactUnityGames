import ApiError from "../error/api.error";
import prisma from "../prisma/prisma";

class GameService {
    async saveScore(
        userId: string,
        gameId: string,
        level: number,
        score: number,
        region: string
        ) {
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

            const newScore = await prisma.userScores.create({
                data: {
                    userId: userId,
                    gameId: gameId,
                    level: Number(level),
                    score: Number(score),
                    region: region
                }
            });

            return newScore;
    }
}

export default new GameService();