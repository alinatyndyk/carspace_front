import {axiosService} from "./axios.service";

const _accessTokenKey = 'access_token'
const _actionTokenKey = 'Authorization'
const _refreshTokenKey = 'refresh_token'

const authService = {
    loginUser: (user) => axiosService.post('http://localhost:5000/auth/user/login', user),
    loginCompany: (company) => axiosService.post('http://localhost:5000/auth/company/login', company),
    registerUser: (user) => axiosService.post('http://localhost:5000/users', user, {
        headers:{
            'Content-type':  'multipart/form-data'
        }
    }),
    uploadUser: (data) => axiosService.post('http://localhost:5000/upload', data, {
        headers:{
            'Content-type':  'multipart/form-data'
        }
    }),
    forgotPasswordUser: (email) => axiosService.post('http://localhost:5000/auth/password_forgot/user', email),
    forgotPasswordCompany: (contact_number) => axiosService.post('http://localhost:5000/auth/password_forgot/company', contact_number),
    resetPasswordUser: (password) => axiosService.put('http://localhost:5000/auth/password_reset/user', password, {
        headers: {
            Authorization: `${authService.getActionToken()}`
        }
    }),
    resetPasswordCompany: (password) => axiosService.put('http://localhost:5000/auth/password_reset/company', password, {
        headers: {
            Authorization: `${authService.getActionToken()}`
        }
    }),

    setTokens: ({access_token, refresh_token}) => {
        localStorage.setItem(_accessTokenKey, access_token)
        localStorage.setItem(_refreshTokenKey, refresh_token)
    },

    setActionToken: ({action_token}) => {
        localStorage.setItem(_actionTokenKey, action_token)
    },

    getActionToken: () => {
        const action = localStorage.getItem(_actionTokenKey);
        console.log(action);
        return action
    },

    deleteActionToken: () => {
        localStorage.removeItem(_actionTokenKey)
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