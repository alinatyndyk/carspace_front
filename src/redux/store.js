import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {authReducer, brandReducer, carReducer} from "./slices";
import {userReducer} from "./slices/user.slice";

const rootReducer = combineReducers({
    cars: carReducer,
    brands: brandReducer,
    auth: authReducer,
    users: userReducer
})

const setupStore = () => configureStore({
    reducer: rootReducer
})

export {setupStore}