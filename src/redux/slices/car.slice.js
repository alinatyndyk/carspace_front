import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {carService} from "../../services";

const initialState = {
    cars: []
}

const getAll = createAsyncThunk(
    'carSlice/getAll',
    async () =>{
        const {data} = await carService.getAll();
        return data
    }
)

const getByBrand = createAsyncThunk(
    'carSlice/getByBrand',
    async ({brand}) =>{
        console.log(brand, 'in async');
        const {data} = await carService.getByBrand(brand);
        return data
    }
)

const carSlice = createSlice({
    name: 'carSlice',
    initialState,
    reducers:{},
    extraReducers: (builder) =>
        builder
            .addCase(getAll.fulfilled, (state, action) => {
                state.cars = action.payload;
            })
            .addCase(getByBrand.fulfilled, (state, action) => {
                state.cars = action.payload;
            })
});

const {reducer: carReducer, actions: {}} = carSlice;

const carActions = {
    getAll,
    getByBrand
}

export {
    carReducer,
    carActions
}