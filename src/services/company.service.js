import {axiosService} from "./axios.service";
import {authService} from "./auth.service";

const companyService = {
    getAll: () => axiosService.get('http://localhost:5000/companies'),
    getById: (_id) => axiosService.get('http://localhost:5000/companies/' + _id),
    updateById: (_id, company) => axiosService.patch('http://localhost:5000/companies/' + _id, company, {
        headers: {
            access_token: `${authService.getAccessToken()}`
        }
    }),
}

export {
    companyService
}