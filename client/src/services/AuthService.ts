import axios, { AxiosResponse } from "axios";
import { API } from "../lib";
import { Lang, User } from "../models/entities";
import { AuthResponse } from "../models/responses";

const API_URL = import.meta.env.VITE_APP_API_URL;

export const registrationAPI = async (
    nickname: string,
    email: string,
    password: string,
    confirmPassword: string,
    region: string,
    lang: string
): Promise<AxiosResponse<AuthResponse>> => {
    return await API.post(`${API_URL}/user/registration`, {
        nickname: nickname,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
        region: region,
        lang: lang
    });
}

export const loginAPI = async (email: string, password: string): Promise<AxiosResponse<AuthResponse>> => {
    return await API.post<AuthResponse>(`${API_URL}/user/login`, {
        email: email,
        password: password
    });
};

export const editUserAPI = async (nickname?: string, lang?: keyof typeof Lang): Promise<AxiosResponse<User>> => {
    return await API.post<User>(`${API_URL}/user/edit`, {
        nickname: nickname,
        lang: lang
    });
}

export const refreshAuthAPI = async (): Promise<AxiosResponse<AuthResponse>> => {
    return await axios.get<AuthResponse>(`${API_URL}/user/refresh`, {
        withCredentials: true,
        headers: {
            'User-Language': localStorage.getItem('lang') || 'en'
        }
    });
}

export const logoutAPI = async (): Promise<AxiosResponse<number | null>> => {
    return await API.post<number | null>(`${API_URL}/user/logout`);
}