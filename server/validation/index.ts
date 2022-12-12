import { NextFunction, Request, Response } from "express";
import { ValidationChain, validationResult } from "express-validator";
import ApiError from "../error/api.error";

function validate(schemas: ValidationChain[]) {
    return async (req: Request, res: Response, next: NextFunction) => {
        await Promise.all(schemas.map(schema => schema.run(req)));

        const result = validationResult(req);
        if (result.isEmpty()) {
            return next();
        }

        const errors = result.array();

        return res.status(400).send(ApiError.badRequest('validation error', ...errors));
    }
}

export default validate;