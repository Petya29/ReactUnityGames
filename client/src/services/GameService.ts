import { AxiosResponse } from "axios";
import { API } from "../lib";
import { Game } from "../models/entities";

const API_URL = import.meta.env.VITE_APP_API_URL;

export const getGamesAPI = async (): Promise<AxiosResponse<Game[]>> => {
    return await API.get<Game[]>(`${API_URL}/game/games`);
}