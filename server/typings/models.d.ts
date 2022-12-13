export namespace Models {
    export interface User {
        id: string;
        nickname: string;
        email: string;
        password: string;
        role: Role;
        isActivated: boolean;
        activationLink: string | null;
        region: string;
        createdAt: Date;
        updatedAt: Date;
        lang: Lang;
        refreshToken?: Token[]
        UserPasswordCode?: UserPasswordCode
    }

    export interface Token {
        id: string;
        userId: string;
        user?: User;
        refreshToken: string;
        createdAt: Date;
        updatedAt: Date;
    }

    export interface UserPasswordCode {
        id: string;
        userId: string;
        user?: User;
        passwordCode: string;
        createdAt: Date;
        updatedAt: Date;
    }

    export type Role = 'USER' | 'ADMIN';
    export type Lang = 'en' | 'pl' | 'ua';
}