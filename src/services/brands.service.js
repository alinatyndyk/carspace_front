import {axiosService} from "./axios.service";

const brandsService = {
    getAll: () => axiosService.get('http://localhost:5000/brands'),
    getAllUsers: () => axiosService.get('http://localhost:5000/users'),
    getUserById: (_id) => axiosService.get(`http://localhost:5000/users/${_id}`),
}
export {
    brandsService
}