import {axiosService} from "./axios.service";

const userService = {
    getAllUsers: () => axiosService.get('http://localhost:5000/users'),
    updateUser: (_id, data) => axiosService.patch(`http://localhost:5000/users/${_id}`, data),
    getUserById: (_id) => axiosService.get(`http://localhost:5000/users/${_id}`),
    getUserOrders: () => axiosService.get('http://localhost:5000/auth/orders/user'),
}
export {
    userService
}