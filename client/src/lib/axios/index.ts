import axios from "axios";
import { AuthResponse } from "../../models/responses";

const API = axios.create({
    withCredentials: true
});

API.interceptors.request.use((config) => {
    config.headers!.Authorization = `Bearer: ${localStorage.getItem('token')}`;
    config.headers!['User-Language'] = localStorage.getItem('lang') || 'en';
    return config;
});

API.interceptors.response.use((config) => {
    return config;
}, async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const response = await axios.get<AuthResponse>(`${process.env.REACT_APP_API_URL}/user/refresh`, { withCredentials: true });
            localStorage.setItem('token', response.data.accessToken);
            return API.request(originalRequest);
        } catch (e) {
            console.error('You are not logged in');
            window.location.reload();
        }
    }
    throw error;
});

export default API;