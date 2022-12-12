import { NextFunction, Request, Response } from "express";

class UserController {
    async create(req: Request, res: Response, next: NextFunction) {
        res.send('fkldashfjklsdaf');
    }
}

export default new UserController();