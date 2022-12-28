import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {authReducer, brandReducer, carReducer} from "./slices";

const rootReducer = combineReducers({
    cars: carReducer,
    brands: brandReducer,
    auth: authReducer,
})

const setupStore = () => configureStore({
    reducer: rootReducer
})

export {setupStore}