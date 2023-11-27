import axios from 'axios';
import { IAuthData } from '../interfaces/auth.interface';

const API_URL = 'http://localhost:7000';

export const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
});

$api.interceptors.request.use((config) => {
    config.headers.Authorization = 'Bearer ' + localStorage.getItem('token');
    return config;
});
$api.interceptors.response.use((config) => {
    return config;
},
    async (error) => {
        try {
            const originalRequest = error.config;
            if (error.response.status == 401) {
                console.log(originalRequest);
                const response = await axios.get<IAuthData>(`${API_URL}/refresh`, { withCredentials: true });
                localStorage.setItem('token', response?.data?.accessToken);
                return $api.request(originalRequest);
            }
        } catch (error) {
            console.log('Не авторизован');
        }

    });