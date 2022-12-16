import { sign, verify } from "jsonwebtoken";
import prisma from "../prisma/prisma";
import { Models } from "../typings/models";
import { TokenResponses } from "../typings/responses";

class TokenService {
    genereteJWT(payload: Pick<Models.User,
        | 'id'
        | 'nickname'
        | 'email'
        | 'role'
        | 'isActivated'
        | 'region'
        | 'lang'
    >): TokenResponses.GenerateJWTResponse {
        const accessToken = sign(
            payload,
            process.env.JWT_ACCESS_SECRET_KEY as string,
            {
                expiresIn: process.env.JWT_ACCESS_EXPIRES_IN as string
            }
        );

        const refreshToken = sign(
            payload,
            process.env.JWT_REFRESH_SECRET_KEY as string,
            {
                expiresIn: process.env.JWT_REFRESH_EXPIRES_IN as string
            }
        );

        return {
            accessToken,
            refreshToken
        }
    }

    async saveToken(userId: string, refreshToken: string, oldTokenId?: string): Promise<Models.Token> {
        let token = null;
        if (oldTokenId) {
            token = await prisma.token.findUnique({
                where: {
                    id: oldTokenId
                }
            });
        }

        if (token) {
            return await prisma.token.update({
                where: {
                    id: oldTokenId
                },
                data: {
                    refreshToken: refreshToken
                }
            });
        }

        return await prisma.token.create({
            data: {
                userId: userId,
                refreshToken: refreshToken
            }
        });
    }

    validateAccessToken(accessToken: string) {
        try {
            const userData = verify(accessToken, process.env.JWT_ACCESS_SECRET_KEY as string);
            return userData;
        } catch (e) {
            return null;
        }
    }

    async validateRefreshToken(refreshToken: string) {
        try {
            return verify(refreshToken, process.env.JWT_REFRESH_SECRET_KEY as string);
        } catch (e) {
            await this.removeRefreshToken(refreshToken);
            return null;
        }
    }

    async removeRefreshToken(refreshToken: string) {
        return await prisma.token.deleteMany({
            where: {
                refreshToken: refreshToken
            }
        });
    }

    async removeAllUserTokens(userId: string) {
        return await prisma.token.deleteMany({
            where: {
                userId: userId
            }
        });
    }
}

export default new TokenService();