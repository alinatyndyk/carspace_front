import {axiosService} from "./axios.service";
import {urls} from "../constants/urls";

const _accessTokenKey = 'access_token'
// const _actionTokenKey = 'Authorization'
const _refreshTokenKey = 'refresh_token'

const authService = {
    loginUser: (user) => axiosService.post('http://localhost:5000/auth/user/login', user),
    logoutUser: () => axiosService.post('http://localhost:5000/auth/user/logout'),
    loginCompany: (company) => axiosService.post('http://localhost:5000/auth/company/login', company),
    logoutCompany: () => axiosService.post('http://localhost:5000/auth/company/logout'),
    registerUser: (user) => axiosService.post('http://localhost:5000/users', user, {
        headers: {
            'Content-type': 'multipart/form-data'
        }
    }),
    forgotPasswordUser: (email) => axiosService.post('http://localhost:5000/auth/password_forgot/user', email),
    forgotPasswordCompany: (contact_number) => axiosService.post('http://localhost:5000/auth/password_forgot/company', contact_number),
    resetPasswordUser: (password, actionToken) => axiosService.put('http://localhost:5000/auth/password_reset/user', password, {
        headers: {
            'Authorization': actionToken
        }
    }),
    resetPasswordCompany: (password, actionToken) => axiosService.put('http://localhost:5000/auth/password_reset/company', password, {
        headers: {
            'Authorization': actionToken
        }
    }),
    refreshUser: (refresh_token) => axiosService.post(`${urls.auth}/user/refresh`, refresh_token, {
        headers: {
            refresh_token: `${authService.getRefreshToken()}`
        }
    }),
    refreshCompany: (refresh_token) => axiosService.post(`${urls.auth}/company/refresh`, refresh_token, {
        headers: {
            refresh_token: refresh_token
        }
    }),

    setTokens: ({access_token, refresh_token}) => {
        localStorage.setItem(_accessTokenKey, access_token)
        localStorage.setItem(_refreshTokenKey, refresh_token)
    },

    // setActionToken: ({action_token}) => {
    //     localStorage.setItem(_actionTokenKey, action_token)
    // },
    //
    // getActionToken: () => {
    //     const action = localStorage.getItem(_actionTokenKey);
    //     console.log(action);
    //     return action
    // },

    // deleteActionToken: () => {
    //     localStorage.removeItem(_actionTokenKey)
    // },

    deleteTokens: () => {
        localStorage.removeItem(_accessTokenKey)
        localStorage.removeItem(_refreshTokenKey)
    },

    getAccessToken: () => {
        // const access = localStorage.getItem(_accessTokenKey);
        // return access
        return localStorage.getItem(_accessTokenKey);
    },

    getRefreshToken: () => {
        // const refresh = localStorage.getItem(_refreshTokenKey);
        // return refresh
        return localStorage.getItem(_refreshTokenKey);
    },

}
export {
    authService
}