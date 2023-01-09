import {axiosService} from "./axios.service";
import {authService} from "./auth.service";
import {urls} from "../constants/urls";

const carService = {
    // getAll: () => axiosService.get('http://localhost:5000/cars'),
    getAll: () => axiosService.get(urls.cars),
    getById: (_id) => axiosService.get(`http://localhost:5000/cars/${_id}`),
    getByDescription: (search) => axiosService.post(`http://localhost:5000/cars/search/description`, search),
    getByBrand: (brand) => axiosService.get(`http://localhost:5000/cars?brand=${brand}`, {
        headers: {
            access_token: `${authService.getAccessToken()}`
        }
    }),
    postCar: (car) => axiosService.post('http://localhost:5000/cars', car, {
        headers: {
            // access_token: `${authService.getAccessToken()}`,
            'Content-Type': 'multipart/form-data'
        }
    }),
    postCarOrder: (_id, dates) => axiosService.post(`http://localhost:5000/cars/${_id}/order`, dates),
    updateCar: (_id, car) => axiosService.patch(`http://localhost:5000/cars/${_id}`, car)
}

export {
    carService
}