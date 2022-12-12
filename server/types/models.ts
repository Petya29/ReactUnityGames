namespace Models {
    export interface User {
        id: string;
        nickname: string;
        email: string;
        password: string;
        role: 'USER' | 'ADMIN';
        isActivated: boolean;
        activationLink: string | null;
        region: string;
        createdAt: string;
        updatedAt: string;
        lang: 'en' | 'pl' | 'ua';
        refreshToken?: Token[]
        UserPasswordCode?: UserPasswordCode
    }

    export interface Token {
        id: string;
        userId: string;
        user?: User;
        refreshToken: string;
        createdAt: string;
        updatedAt: string;
    }

    export interface UserPasswordCode {
        id: string;
        userId: string;
        user?: User;
        passwordCode: string;
        createdAt: string;
        updatedAt: string;
    }
}