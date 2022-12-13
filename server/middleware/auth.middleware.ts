import { NextFunction, Request, Response } from "express";
import ApiError from "../error/api.error";
import TokenService from "../services/token.service";

function authMiddleware (req: Request, res: Response, next: NextFunction) {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            return next(ApiError.unauthorizedError());
        }

        const accessToken = authorizationHeader.split(' ')[1];
        if(!accessToken) {
            return next(ApiError.unauthorizedError());
        }

        const userData = TokenService.validateAccessToken(accessToken);
        if (!userData) {
            return next(ApiError.unauthorizedError());
        }

        req.user = userData;

        next();
    } catch (e) {
        return next(ApiError.unauthorizedError());
    }
}

export default authMiddleware;