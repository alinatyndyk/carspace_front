import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {carService, userService} from "../../services";

const initialState = {
    users: [],
    user: null,
    orders: [],
    errors: null
}

const getAll = createAsyncThunk(
    'brandSlice/getAll',
    async () => {
        const {data} = await userService.getAllUsers();
        console.log(data, 'async thunk');
        return data
    }
)

const getById = createAsyncThunk(
    'brandSlice/getById',
    async ({_id}) => {
        console.log(_id, 'user i din async');
        const {data} = await userService.getUserById(_id);
        console.log(data, 'async thunk get user by id');
        return data
    }
)

const getUserOrders = createAsyncThunk(
    'authSlice/getUserOrders',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await userService.getUserOrders();
            return data
        } catch (e) {
            return rejectWithValue(e.response.data);
        }
    }
)

const updateUser = createAsyncThunk(
    'carSlice/updateUser',
    async ({_id, user}, {rejectWithValue}) => {
        try {
            console.log(_id, user, 'update in async');
            const {data} = await userService.updateUser(_id, user);
            console.log(data, 'data updateCar from async');
            return data
        } catch (e) {
            console.log(e.response.data, 'err in async');
            return rejectWithValue(e.response.data);
        }
    }
)

const userSlice = createSlice({
    name: 'brandSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) =>
        builder
            .addCase(getAll.fulfilled, (state, action) => {
                console.log(action.payload, 'action payload');
                state.users = action.payload;
            })
            .addCase(getById.fulfilled, (state, action) => {
                console.log(action.payload, 'action payload get user by id');
                state.user = action.payload;
            })
            .addCase(getUserOrders.fulfilled, (state, action) => {
                state.orders = action.payload;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                console.log(action.payload, 'ap addcase postcar');
                window.location.reload();
                // state.users.find(value => value === action.payload._id);
                // Object.assign(currentCar, action.payload);
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

const {reducer: userReducer, actions: {}} = userSlice;

const userActions = {
    getAll,
    getById,
    getUserOrders,
    updateUser
}

export {
    userReducer,
    userActions
}