import { body } from "express-validator";

const registrationSchema = [
    body('nickname').isLength({ min: 4, max: 32 }).withMessage('Name must be at least 4 and no more than 32 characters'),
    body('email').isEmail().withMessage('Incorrect email'),
    body('password').isLength({ min: 8, max: 32 }).withMessage('Password must be at least 8 and no more than 32 characters'),
    body('confirmPassword').custom((value, { req }) => {
        if (value === req.body.password) {
            return true;
        } else {
            return false;
        }
    }).withMessage('Passwords do not match'),
    body('region').exists({ checkFalsy: true }).withMessage('region cannot be an empty string'),
    body('lang').exists({ checkFalsy: true }).withMessage('lang cannot be an empty string')
];

export {
    registrationSchema
}