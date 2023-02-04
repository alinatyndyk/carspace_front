import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {carService} from "../../services";

const initialState = {
    cars: [],
    car: {},
    carForUpdate: null,
    errors: null
}

const getAll = createAsyncThunk(
    'carSlice/getAll',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await carService.getAll();
            return data.cars
        } catch (e) {
            console.log(e.response.status);
            return rejectWithValue(e.response.data);
        }
    }
)

const getAllWithParams = createAsyncThunk(
    'carSlice/getAllWithParams',
    async ({params}, {rejectWithValue}) => {
        try {
            const {data} = await carService.getAllWithParams(params);
            return data.cars
        } catch (e) {
            console.log(e.response.status);
            return rejectWithValue(e.response.data);
        }
    }
)

const getByDescription = createAsyncThunk(
    'carSlice/getByDescription',
    async ({description, params}, {rejectWithValue}) => {
        try {
            const {data} = await carService.getByDescription(description, params);
            return data.cars

        } catch (e) {
            return rejectWithValue(e.response.data);
        }
    }
)

const getFilteredByDate = createAsyncThunk(
    'carSlice/getFilteredByDate',
    async ({info}, {rejectWithValue}) => {
        try {
            const {data} = await carService.getFilteredByDate(info);
            return data

        } catch (e) {
            console.log(e.response.data);
            return rejectWithValue(e.response.data);
        }
    }
)

const postCar = createAsyncThunk(
    'carSlice/postCar',
    async ({car}, {rejectWithValue}) => {
        try {
            delete car['digital_hud']
            delete car['cruise_control']
            delete car['adaptive_cruise_control']
            delete car['parking_assist']
            delete car['parking_sensors']
            delete car['reverse_camera']
            delete car['three_d_surround_camera']
            delete car['tinted_windows']
            delete car['power_seats']
            delete car['leather_seats']
            delete car['massaging_seats']
            delete car['rear_ac']
            delete car['sunroof_moonroof']
            delete car['premium_audio']
            delete car['front_rear_airbags']
            delete car['apple_carplay']
            delete car['android_auto']
            delete car['bluetooth']
            delete car['usb']
            delete car['chiller_freezer']
            const {data} = await carService.postCar(car);
            return data //todo data car with pages
        } catch (e) {
            console.log(e.response.data, 'err in async');
            return rejectWithValue(e.response.data);
        }
    }
)

const updateCar = createAsyncThunk(
    'carSlice/updateCar',
    async ({_id, car}, {rejectWithValue}) => {
        try {
            const {data} = await carService.updateCar(_id, car);
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
            const {data} = await carService.postCarOrder(_id, dates);
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
        const {data} = await carService.getById(_id);
        return data
    }
)

const getByBrand = createAsyncThunk(
    'carSlice/getByBrand',
    async ({brand}) => {
        const {data} = await carService.getByBrand(brand);
        return data.cars
    }
)

const carSlice = createSlice({
    name: 'carSlice',
    initialState,
    reducers: {
        setCarForUpdate: (state, action) => {
            state.carForUpdate = action.payload;
        }
    },
    extraReducers: (builder) =>
        builder
            .addCase(getAll.fulfilled, (state, action) => {
                state.cars = action.payload;
            })
            .addCase(getAllWithParams.fulfilled, (state, action) => {
                state.cars = action.payload;
            })
            .addCase(getByDescription.fulfilled, (state, action) => {
                state.cars = action.payload;
            })
            .addCase(getFilteredByDate.fulfilled, (state, action) => {
                state.cars = action.payload;
            })
            .addCase(updateCar.fulfilled, (state, action) => {
                state.carForUpdate = null;
                window.location.reload();
            })
            .addCase(postCar.fulfilled, (state, action) => {
                state.cars.push(action.payload)
            })
            .addCase(getById.fulfilled, (state, action) => {
                state.car = action.payload;
            })
            .addCase(getByBrand.fulfilled, (state, action) => {
                state.cars = action.payload;
            })
            .addDefaultCase((state, action) => {
                const [type] = action.type.split('/').splice(-1);
                if (type === 'rejected') {
                    // console.log('ERROR', action.payload);
                    state.errors = action.payload;
                    console.log(state.errors, typeof state.errors, 'typeof slice');
                } else {
                    state.errors = null;
                }
            })
});

const {reducer: carReducer, actions: {setCarForUpdate}} = carSlice;

const carActions = {
    getAll,
    getById,
    getByBrand,
    postCar,
    getByDescription,
    postCarOrder,
    setCarForUpdate,
    updateCar,
    getFilteredByDate,
    getAllWithParams
}

export {
    carReducer,
    carActions
}