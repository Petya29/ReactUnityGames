declare global {
    namespace NodeJS {
        export interface ProcessEnv {
            PORT: string;
            API_URL: string;
            CLIENT_URL: StringLitera;
            JWT_ACCESS_SECRET_KEY: string;
            JWT_REFRESH_SECRET_KEY: string;
            JWT_ACCESS_EXPIRES_IN: string;
            JWT_REFRESH_EXPIRES_IN: string;
            // TODO SMTP
            PASSWORD_CODE_TTL: string;
            DATABASE_URL: string;
        }
    }
}

declare module Express {
    export interface Request {
        user: any;
    }
}
