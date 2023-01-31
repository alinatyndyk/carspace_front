import axios from "axios";
import {baseURL} from "../constants/urls";
import {authService} from "./auth.service";
import {createBrowserHistory} from 'history'

const history = createBrowserHistory();

const axiosService = axios.create({baseURL});

axiosService.interceptors.request.use((config) => {
    const access_token = authService.getAccessToken();
    if (access_token) {
        config.headers.access_token = `${access_token}`
        return config
    } else if (!access_token)
        console.log('no token');
    return config
})

let isRefreshing = false;
axiosService.interceptors.response.use((config) => {
        return config
    }, async (error) => {
        const refresh_token = authService.getRefreshToken();
        console.log('ERROR RESPONSE', error);
        if (error.response?.status === 403) {
            throw error
        } else if (error.response?.status === 401 && refresh_token && !isRefreshing) {
            isRefreshing = true;
            try {
                const first = refresh_token.split(' ')[0];
                console.log(first);
                if (first === 'User') {
                    const {data} = await authService.refreshUser(refresh_token);
                    authService.setTokens(data);
                } else if (first === 'Company') {
                    const {data} = await authService.refreshCompany(refresh_token);
                    authService.setTokens(data);
                } else {
                    throw new Error('Not valid first');
                }
            } catch (e) {
                authService.deleteTokens();
                return history.replace('/account?ExpSession=true');
            }
            isRefreshing = false;
            return axiosService(error.config);
        } else if (error.response?.status === 401 && !refresh_token) {
            throw error
        }
        return Promise.reject(error);
    }
)

export {
    axiosService,
    history
}