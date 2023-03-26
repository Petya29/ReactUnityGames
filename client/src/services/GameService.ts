import { AxiosResponse } from "axios";
import { API } from "../lib";
import { Game, UserScore } from "../models/entities";

const API_URL = import.meta.env.VITE_APP_API_URL;

export const getGamesAPI = async (): Promise<AxiosResponse<Game[]>> => {
    return await API.get<Game[]>(`${API_URL}/game/games`);
}

export const getScoresAPI = async (gameId: string, region?: string): Promise<AxiosResponse<UserScore[]>> => {
    return await API.get<UserScore[]>(`${API_URL}/game/get-many-scores/${gameId}?region=${region ? region : 'Europe'}`);
}

export const getUserScoreAPI = async (gameId: string): Promise<AxiosResponse<UserScore | null>> => {
    return await API.get<UserScore | null>(`${API_URL}/game/get-score/${gameId}`);
}

export const saveScoreAPI = async (
    gameId: string,
    score: number,
    level?: number,
    region?: string
): Promise<AxiosResponse<UserScore>> => {
    return await API.post<UserScore>(`${API_URL}/game/save-score/${gameId}`, {
        score: score,
        level: level,
        region: region
    });
}