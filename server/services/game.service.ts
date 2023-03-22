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
            const gameExists = await prisma.game.findUnique({
                where: {
                    id: gameId
                }
            });

            if(!gameExists) {
                throw ApiError.badRequest('Game with this id does not exist', {
                    msg: 'Game with this id does not exist',
                    param: 'gameId'
                });
            }

            const newScore = await prisma.userScores.create({
                data: {
                    userId: userId,
                    gameId: gameId,
                    level: level,
                    score: score,
                    region: region
                }
            });

            return newScore;

    }
}

export default new GameService();