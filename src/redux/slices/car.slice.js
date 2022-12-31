import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {carService} from "../../services";

const initialState = {
    cars: [],
    car: []
}

const getAll = createAsyncThunk(
    'carSlice/getAll',
    async () => {
        const {data} = await carService.getAll();
        return data
    }
)

const postCar = createAsyncThunk(
    'authSlice/postCar',
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

const getById = createAsyncThunk(
    'carSlice/getById',
    async ({_id}) => {
        console.log(_id, 'id in async');
        const {data} = await carService.getById(_id);
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
    postCar
}

export {
    carReducer,
    carActions
}