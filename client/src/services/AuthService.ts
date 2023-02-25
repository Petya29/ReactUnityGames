import { AxiosResponse } from "axios";
import { API } from "../lib";
import { AuthResponse } from "../models/responses";

const API_URL = import.meta.env.VITE_APP_API_URL;

export const loginAPI = async (email: string, password: string): Promise<AxiosResponse<AuthResponse>> => {
    return await API.post<AuthResponse>(`${API_URL}/user/login`, {
        email: email,
        password: password
    });
};