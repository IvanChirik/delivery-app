import { store } from '../store/store';
import { userActions } from '../store/user.state';
import axios from 'axios';
import { IAuthData } from '../interfaces/auth.interface';
import { API_URL } from '../helpers/API';


export const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
});
$api.interceptors.request.use((config) => {
    const token = store.getState().user.token;
    if (token) {
        config.headers.Authorization = 'Bearer ' + token;
    }
    return config;
});
$api.interceptors.response.use((config) => {
    return config;
},
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && originalRequest && !originalRequest._isRetry) {
            originalRequest._isRetry = true;
            try {
                const response = await axios.get<IAuthData>(`${API_URL}/auth/refresh`, { withCredentials: true });
                store.dispatch(userActions.setToken(response.data.accessToken));
                return $api.request(originalRequest);
            }
            catch (error) {
                console.log('Не авторизован');
            }
        }
        else if (error.response.status === 401) {
            store.dispatch(userActions.setToken(null));
            store.dispatch(userActions.setLoginErrorMessage(error.response.data.message));
        }
        else
            throw new Error(error.response?.data.message);
    });