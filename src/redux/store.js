import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {companyReducer, userReducer, authReducer, brandReducer, carReducer} from "./slices";

const rootReducer = combineReducers({
    cars: carReducer,
    brands: brandReducer,
    auth: authReducer,
    users: userReducer,
    companies: companyReducer
})

const setupStore = () => configureStore({
    reducer: rootReducer
})

export {setupStore}