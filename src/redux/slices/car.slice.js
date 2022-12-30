import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {carService} from "../../services";

const initialState = {
    uploads: {},
    cars: [],
    car: []
}

const getAll = createAsyncThunk(
    'carSlice/getAll',
    async () =>{
        const {data} = await carService.getAll();
        return data
    }
)

const getUploads = createAsyncThunk(
    'carSlice/getUploads',
    async () =>{
        const {data} = await carService.getUploads();
        return data
    }
)

const getById = createAsyncThunk(
    'carSlice/getById',
    async ({_id}) =>{
        console.log(_id, 'id in async');
        const {data} = await carService.getById(_id);
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
            .addCase(getUploads.fulfilled, (state, action) => {
                console.log(action.payload);
                state.uploads = action.payload;
            })
            .addCase(getById.fulfilled, (state, action) => {
                console.log(action.payload, 'car in add case');
                state.car = action.payload;
            })
            .addCase(getByBrand.fulfilled, (state, action) => {
                state.cars = action.payload;
            })
});

const {reducer: carReducer, actions: {}} = carSlice;

const carActions = {
    getAll,
    getById,
    getByBrand,
    getUploads
}

export {
    carReducer,
    carActions
}