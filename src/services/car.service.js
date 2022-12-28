import {axiosService} from "./axios.service";
import {authService} from "./auth.service";

const carService = {
    getAll: () => axiosService.get('http://localhost:5000/cars', {
        headers: {
            access_token:`${authService.getAccessToken()}`
        }
    }),
    getById: (id) => axiosService.get(`http://localhost:5000/cars/${id}`),
    getByBrand: (brand) => axiosService.get(`http://localhost:5000/cars?brand=${brand}`, {
        headers: {
            access_token:`${authService.getAccessToken()}`
        }
    }),
    postCar: () => axiosService.post('http://localhost:5000/cars'),
}
export {
    carService
}