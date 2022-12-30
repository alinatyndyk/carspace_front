import {axiosService} from "./axios.service";
import {authService} from "./auth.service";

const carService = {
    getAll: () => axiosService.get('http://localhost:5000/cars', {
        headers: {
            access_token: `${authService.getAccessToken()}`
        }
    }),
    getById: (_id) => axiosService.get('http://localhost:5000/cars/' + _id),
    getByBrand: (brand) => axiosService.get(`http://localhost:5000/cars?brand=${brand}`, {
        headers: {
            access_token: `${authService.getAccessToken()}`
        }
    }),
    postCar: (car) => axiosService.post('http://localhost:5000/cars', car),
    getUploads: () => axiosService.get('http://localhost:5000/upload'),
    postUpload: (data) => axiosService.get('http://localhost:5000/upload', data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    }),
}
export {
    carService
}