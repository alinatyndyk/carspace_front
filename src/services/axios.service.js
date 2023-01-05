import axios from "axios";
import {baseURL} from "../constants/urls";
import {authService} from "./auth.service";
import {createBrowserHistory} from 'history'

const history = createBrowserHistory();

const axiosService = axios.create({baseURL});

axiosService.interceptors.request.use((config) => {
    const access_token = authService.getAccessToken();
    console.log(access_token, 'access in interseptor');
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
        console.log(refresh_token, 'refresh token interceptor');
        console.log('ERROR RESPONSE', error);
        if (error.response?.status === 403) {
            console.log('status 403');
            throw error
        } else if (error.response?.status === 401 && refresh_token && !isRefreshing) {
            console.log('status 401 + token');
            isRefreshing = true;
            try {
                const first = refresh_token.split(' ')[0];
                console.log(first);
                if (first === 'User') {
                    console.log('in user refresh');
                    const {data} = await authService.refreshUser(refresh_token);
                    console.log(data, 'tokens');
                    authService.setTokens(data);
                } else if (first === 'Company') {
                    console.log(first, 'first in company');
                    console.log('in company refresh');
                    console.log(refresh_token, 'refresh first company');
                    const {data} = await authService.refreshCompany(refresh_token);
                    console.log(data, 'new token pair');
                    authService.setTokens(data);
                } else {
                    throw new Error('Not valid first');
                }
            } catch (e) {
                console.log(e.response.data, 'e in catch');
                authService.deleteTokens();
                return history.replace('/account?ExpSession=true');
            }
            isRefreshing = false;
            return axiosService(error.config);
        } else if (error.response?.status === 401 && !refresh_token) {
            console.log('status 401 no token');
            throw error
        }
        return Promise.reject(error);
    }
)

// axiosService.interceptors.response.use((config) => {
//         return config
//     },
//     async (error) => {
//         const refresh_token = authService.getRefreshToken();
//         console.log(refresh_token, 'refresh token interceptor');
//         if (error.response?.status === 401 && error.config && !isRefreshing && refresh_token) {
//             console.log(403, 'interceptor response');
//             try {
//                 console.log('in try');
//                 console.log(refresh_token, 'refresh token interceptor try');
//                 const {data} = await authService.refreshCompany({refresh_token: refresh_token});
//                 console.log(data, 'inter refresh data company');
//                 authService.setTokens(data);
//             } catch (e) {
//                 console.log('in catch');
//                 authService.deleteTokens();
//                 return history.replace('/login/company?ExpSession=true');
//             }
//             isRefreshing = false;
//             return axiosService(error.config, 'error config');
//         }
//         return Promise.reject(error, 'promise');
//     })

// let isRefreshing = false;
// axiosService.interceptors.response.use((config) => {
//         return config
//     },
//     async (error) => {
//         console.log(error, 'start');
//         const refresh_token = authService.getRefreshToken();
//         console.log(refresh_token, 'refresh token interceptor');
//         if (error.response?.status === 401 && error.config && !isRefreshing && refresh_token) {
//             console.log(403, 'interceptor response 401');
//             isRefreshing = true;
//             try {
//                 console.log('in try');
//                 console.log(refresh_token, 'refresh token interceptor try');
//                 const first = refresh_token.split(' ')[0];
//                 console.log(first);
//                 if (first === 'User') {
//                     console.log(first, 'first in user');
//                     const {data, errors} = await authService.refreshUser({refresh_token: refresh_token});
//                     console.log(errors);
//                     console.log(data, 'key word USER refresh');
//                     authService.setTokens(data);
//                 } else if (first === 'Company') {
//                     console.log(first, 'first in company');
//                     const {data} = await authService.refreshCompany({refresh_token: refresh_token});
//                     console.log(data, 'key word COMPANY refresh');
//                     authService.setTokens(data);
//                 }
//             } catch (e) {
//                 console.log('in catch');
//                 authService.deleteTokens();
//                 return history.replace('/account?ExpSession=true');
//             }
//             isRefreshing = false;
//             return axiosService(error.config);
//         }
//         return Promise.reject(error);
//     })

export {
    axiosService,
    history
}