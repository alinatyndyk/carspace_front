import {axiosService} from "./axios.service";
import {authService} from "./auth.service";
import {urls} from "../constants/urls";

const carService = {
    getAllWithParams: (params) => axiosService.get(`http://localhost:5000/cars?${params}`),
    getAll: () => axiosService.get(urls.cars),
    getFilteredByDate: (data) => axiosService.post('http://localhost:5000/cars/filter/date', data),
    getById: (_id) => axiosService.get(`http://localhost:5000/cars/${_id}`),
    getByDescription: (description, params = {page: 1}) => axiosService.post(`http://localhost:5000/cars/search/description?${params}`, description),
    getByBrand: (brand) => axiosService.get(`http://localhost:5000/cars?brand=${brand}`, {
        headers: {
            access_token: `${authService.getAccessToken()}`
        }
    }),
    postCar: (car) => axiosService.post('http://localhost:5000/cars', car),
    postCarOrder: (_id, dates) => axiosService.post(`http://localhost:5000/cars/${_id}/order`, dates),
    updateCar: (_id, car) => axiosService.patch(`http://localhost:5000/cars/${_id}`, car)
}

export {
    carService
}