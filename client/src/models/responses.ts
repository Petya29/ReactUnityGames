import { User } from "./entities";

export interface AuthResponse {
    user: User,
    accessToken: string,
    refreshToken: string
}