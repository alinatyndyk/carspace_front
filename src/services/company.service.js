import {axiosService} from "./axios.service";
import {authService} from "./auth.service";

const companyService = {
    getAll: () => axiosService.get('http://localhost:5000/companies'),
    getById: (_id) => axiosService.get('http://localhost:5000/companies/' + _id),
    deleteById: (_id) => axiosService.delete('http://localhost:5000/companies/' + _id),
    getCompanyOrders: () => axiosService.get('http://localhost:5000/auth/orders/company'),
    getCompanyOrderById: (_id) => axiosService.get(`http://localhost:5000/auth/company-orders/${_id}`),
    getCompanyOrdersToday: () => axiosService.get('http://localhost:5000/auth/orders/today'),
    updateById: (_id, company) => axiosService.patch('http://localhost:5000/companies/' + _id, company, {
        headers: {
            access_token: `${authService.getAccessToken()}`
        }
    }),
}

export {
    companyService
}