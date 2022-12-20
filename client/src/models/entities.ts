export interface User {
    id: string;
    nickname: string;
    email: string;
    password: string;
    role: Role;
    isActivated: boolean;
    activationLink: string | null;
    region: string;
    lang: Lang;
    createdAt: Date;
    updatedAt: Date;
}

export interface Token {
    id: string;
    userId: string;
    refreshToken: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface UserPasswordCode {
    id: string;
    userId: string;
    passwordCode: string;
    createdAt: Date;
    updatedAt: Date;
}

export type Role = 'USER' | 'ADMIN';
export type Lang = 'en' | 'pl' | 'ua';