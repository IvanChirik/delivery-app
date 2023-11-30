import axios from 'axios';
import { IAuthData } from '../interfaces/auth.interface';
import { saveState } from '../helpers/storage';
import { JWT_PERSISTENT_STATE } from '../store/user.state';
import { API_URL } from '../helpers/API';


export const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
});
$api.interceptors.request.use((config) => {
    const token = localStorage.getItem('userData');
    if (token) {
        config.headers.Authorization = 'Bearer ' + JSON.parse(token).token;
    }
    return config;
});
$api.interceptors.response.use((config) => {
    return config;
},
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && error.config && !error.config._isRetry) {
            originalRequest._isRetry = true;
            try {
                const response = await axios.get<IAuthData>(`${API_URL}/auth/refresh`, { withCredentials: true });
                saveState({ token: response.data.accessToken }, JWT_PERSISTENT_STATE);
                return $api.request(originalRequest);
            }
            catch (error) {
                console.log('Не авторизован');
            }
        }
        throw error;
    });