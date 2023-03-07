import {axiosService} from "./axios.service";

const brandsService = {
    getAll: () => axiosService.get('http://localhost:5000/brands'),
    create: (object) => axiosService.post('http://localhost:5000/brands', object),
    deleteById: (_id) => axiosService.delete(`http://localhost:5000/brands/${_id}`),
    getUserById: (_id) => axiosService.get(`http://localhost:5000/users/${_id}`),
}
export {
    brandsService
}