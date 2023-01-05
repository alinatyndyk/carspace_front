import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {carService} from "../../services";

const initialState = {
    cars: [],
    car: {},
    errors: null
}

const getAll = createAsyncThunk(
    'carSlice/getAll',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await carService.getAll();
            // console.log('get all cars asunc', data);
            return data
        } catch (e) {
            console.log(e.response.status);
            return rejectWithValue(e.response.data);
        }
    }
)

const getByDescription = createAsyncThunk(
    'carSlice/getByDescription',
    async ({search}, {rejectWithValue}) => {
        try {
            console.log(search, 'searxh in async');
            const {data} = await carService.getByDescription(search);
            return data

        } catch (e) {
            return rejectWithValue(e.response.data);
        }
    }
)

const postCar = createAsyncThunk(
    'carSlice/postCar',
    async ({car}, {rejectWithValue}) => {
        try {
            console.log(car, 'car in async');
            const {data} = await carService.postCar(car);
            console.log(data, 'data car from async');
            return data
        } catch (e) {
            console.log(e.response.data, 'err in async');
            return rejectWithValue(e.response.data);
        }
    }
)

const postCarOrder = createAsyncThunk(
    'carSlice/postCarOrder',
    async ({_id, dates}, {rejectWithValue}) => {
        try {
            console.log(dates, _id, 'dates in async');
            const {data} = await carService.postCarOrder(_id, dates);
            console.log(data, 'data car from async');
            return data
        } catch (e) {
            console.log(e.response.data, 'err in async');
            return rejectWithValue(e.response.data);
        }
    }
)

const getById = createAsyncThunk(
    'carSlice/getById',
    async ({_id}) => {
        console.log(_id, 'id in async');
        const {data} = await carService.getById(_id);
        console.log(data, 'data in async');
        return data
    }
)

const getByBrand = createAsyncThunk(
    'carSlice/getByBrand',
    async ({brand}) => {
        console.log(brand, 'in async');
        const {data} = await carService.getByBrand(brand);
        return data
    }
)

const carSlice = createSlice({
    name: 'carSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) =>
        builder
            .addCase(getAll.fulfilled, (state, action) => {
                state.cars = action.payload;
            })
            .addCase(getByDescription.fulfilled, (state, action) => {
                state.cars = action.payload;
            })
            .addCase(postCar.fulfilled, (state, action) => {
                console.log(action.payload, 'ap addcase postcar');
                state.cars.push(action.payload)
            })
            .addCase(getById.fulfilled, (state, action) => {
                console.log(action.payload, 'car in add case');
                state.car = action.payload;
            })
            .addCase(getByBrand.fulfilled, (state, action) => {
                state.cars = action.payload;
            })
            .addDefaultCase((state, action) => {
                const [type] = action.type.split('/').splice(-1);
                if (type === 'rejected') {
                    console.log('ERROR', action.payload);
                    state.errors = action.payload
                } else {
                    state.errors = null;
                }
            })
});

const {reducer: carReducer, actions: {}} = carSlice;

const carActions = {
    getAll,
    getById,
    getByBrand,
    postCar,
    getByDescription,
    postCarOrder
}

export {
    carReducer,
    carActions
}