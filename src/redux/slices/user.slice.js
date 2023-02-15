import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {userService} from "../../services";

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
        const {data} = await userService.getUserById(_id);
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
            const {data} = await userService.updateUser(_id, user);
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
                state.users = action.payload;
            })
            .addCase(getById.fulfilled, (state, action) => {
                state.user = action.payload;
            })
            .addCase(getUserOrders.fulfilled, (state, action) => {
                state.orders = action.payload;
            })
            .addCase(updateUser.fulfilled, () => {
                window.location.reload();
            })
            .addDefaultCase((state, action) => {
                const [type] = action.type.split('/').splice(-1);
                if (type === 'rejected') {
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