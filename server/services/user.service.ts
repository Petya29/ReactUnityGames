import { hash } from "bcryptjs";
import { v4 } from "uuid";
import ApiError from "../error/api.error";
import prisma from "../prisma/prisma";
import { Models } from "../typings/models";

class UserService {
    async registration(
        nickname: string,
        email: string,
        password: string,
        region: string,
        lang: Models.Lang
    ): Promise<Models.User> {
        const candidate = await prisma.user.findUnique({
            where: {
                email: email
            }
        });
        if (candidate) {
            throw ApiError.badRequest('User with this email already exists', {
                msg: 'User with this email already exists',
                param: 'email'
            });
        }

        const hashPassword = await hash(password, 5);
        const activationLink = v4();
        const newUser = prisma.user.create({
            data: {
                nickname: nickname,
                email: email,
                password: hashPassword,
                activationLink: activationLink,
                region: region,
                lang: lang
            }
        });

        return newUser;
    }
}

export default new UserService();