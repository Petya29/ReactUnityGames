import { NextFunction, Request, Response } from "express";
import TokenService from "../services/token.service";
import UserService from "../services/user.service";
import { Models } from "../typings/models";

const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;

class UserController {
    async registration(req: Request, res: Response, next: NextFunction) {
        try {
            const {
                nickname,
                email,
                password,
                region,
                lang
            }: {
                nickname: string,
                email: string,
                password: string,
                region: string,
                lang: Models.Lang
            } = req.body;

            const newUser = await UserService.registration(nickname, email, password, region, lang);
            // TODO send mail
            const tokens = TokenService.genereteJWT({
                id: newUser.id,
                nickname: newUser.nickname,
                email: newUser.email,
                isActivated: newUser.isActivated,
                role: newUser.role,
                region: newUser.region,
                lang: newUser.lang
            });
            await TokenService.saveToken(newUser.id, tokens.refreshToken);

            res.cookie(
                'refreshToken',
                tokens.refreshToken,
                {
                    maxAge: THIRTY_DAYS,
                    httpOnly: true
                }
            );

            return res.json({
                user: newUser,
                ...tokens
            });
        } catch (e) {
            next(e);
        }
    }
}

export default new UserController();