import {axiosService} from "./axios.service";

const brandsService = {
    getAll: () => axiosService.get('http://localhost:5000/brands')
}
export {
    brandsService
}