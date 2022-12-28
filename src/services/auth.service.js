import {axiosService} from "./axios.service";

const _accessTokenKey = 'access_token'
const _refreshTokenKey = 'refresh_token'

const authService = {
    loginUser: (user) => axiosService.post('http://localhost:5000/auth/user/login', user),
    registerUser: (user) => axiosService.post('http://localhost:5000/users', user),

    setTokens: ({access_token, refresh_token}) => {
        localStorage.setItem(_accessTokenKey, access_token)
        localStorage.setItem(_refreshTokenKey, refresh_token)
    },

    deleteTokens: () => {
        localStorage.removeItem(_accessTokenKey)
        localStorage.removeItem(_refreshTokenKey)
    },

    getAccessToken: () => {
        const access = localStorage.getItem(_accessTokenKey)
        console.log(access);
        return access
    },

    getRefreshToken: () => {
        localStorage.getItem(_refreshTokenKey)
    },

}
export {
    authService
}