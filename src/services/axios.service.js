import axios from "axios";
import {baseUrl} from "../constants/urls";

const axiosService = axios.create({baseUrl});

export {
    axiosService
}