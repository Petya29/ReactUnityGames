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

export interface Game {
    id: string;
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface UserScore {
    id: string;
    userId: string;
    gameId: string;
    level: number;
    score: number;
    region: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Snackbar {
    text: string,
    severity: 'error' | 'info' | 'success' | 'warning',
    open: boolean
}

export type Role = 'USER' | 'ADMIN';
export type Mode = 'dark' | 'light';

export enum Lang {
    en = 'en',
    pl = 'pl',
    ua = 'ua'
}