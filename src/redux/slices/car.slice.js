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
            return rejectWithValue(e.response.data);
        }
    }
)

const getAllWithParams = createAsyncThunk(
    'carSlice/getAllWithParams',
    async ({params, page}, {rejectWithValue}) => {
        try {
            const {data} = await carService.getAllWithParams(params, page);
            return data.cars
        } catch (e) {
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
    async ({info, query}, {rejectWithValue}) => {
        try {
            const {data} = await carService.getFilteredByDate(info, query);
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
            console.log(car);
            const {data} = await carService.postCar(car);
            console.log(data);
            return data
        } catch (e) {
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

const deleteById = createAsyncThunk(
    'carSlice/deleteById',
    async ({_id}) => {
        const {data} = await carService.deleteById(_id);
        return data
    }
)

const getByBrand = createAsyncThunk(
    'carSlice/getByBrand',
    async ({brand, page}) => {
        const {data} = await carService.getByBrand(brand, page);
        return data.cars
    }
)

const getByLocation = createAsyncThunk(
    'carSlice/getByLocation',
    async ({location, page}) => {
        const {data} = await carService.getByLocation(location, page);
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
            .addCase(updateCar.fulfilled, (state) => {
                state.carForUpdate = null;
                window.location.reload();
            })
            .addCase(postCar.fulfilled, (state, action) => {
                state.cars.push(action.payload);
            })
            .addCase(getById.fulfilled, (state, action) => {
                state.car = action.payload;
            })
            .addCase(getByBrand.fulfilled, (state, action) => {
                state.cars = action.payload;
            })
            .addCase(getByLocation.fulfilled, (state, action) => {
                state.cars = action.payload;
            })
            .addDefaultCase((state, action) => {
                const [type] = action.type.split('/').splice(-1);
                if (type === 'rejected') {
                    state.errors = action.payload;
                    console.log(action.payload, '***');
                    if (action.payload === 'No cars with given parameters') {
                        state.cars = [];
                    }
                } else {
                    state.errors = null;
                }
            })
});

const {reducer: carReducer, actions: {setCarForUpdate}} = carSlice;

const carActions = {
    getAll,
    getById,
    deleteById,
    getByBrand,
    getByLocation,
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