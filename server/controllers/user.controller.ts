import { NextFunction, Request, Response } from "express";
import MailService from "../services/mail.service";
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

            await MailService.sendActivationMail(email, `${process.env.API_URL}/api/user/activate/${newUser.activationLink}`);

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

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password }: { email: string, password: string } = req.body;

            const userData = await UserService.login(email, password);

            const tokens = TokenService.genereteJWT({
                id: userData.id,
                nickname: userData.nickname,
                email: userData.email,
                isActivated: userData.isActivated,
                role: userData.role,
                region: userData.region,
                lang: userData.lang
            });
            await TokenService.saveToken(userData.id, tokens.refreshToken);

            res.cookie(
                'refreshToken',
                tokens.refreshToken,
                {
                    maxAge: THIRTY_DAYS,
                    httpOnly: true
                });

            return res.json({
                user: userData,
                ...tokens
            });
        } catch (e) {
            next(e);
        }
    }

    async activate(req: Request, res: Response, next: NextFunction) {
        try {
            const activationLink = req.params.link;
            await UserService.activate(activationLink);

            return res.redirect(process.env.CLIENT_URL as string);
        } catch (e) {
            next(e);
        }
    }

    async logout(req: Request, res: Response, next: NextFunction) {
        try {
            const { refreshToken }: { refreshToken: string } = req.cookies;
            if (!refreshToken) return res.json(null); 
            
            const userData = await TokenService.validateRefreshToken(refreshToken);
            if (!userData || typeof userData === 'string') return res.json(null); 
            const token = await TokenService.removeAllUserTokens(userData.id);
            
            res.clearCookie('refreshToken');

            return res.json(token);
        } catch (e) {
            next(e);
        }
    }
}

export default new UserController();