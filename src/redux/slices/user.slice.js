import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {brandsService} from "../../services";

const initialState = {
    users: [],
    user: null
}

const getAll = createAsyncThunk(
    'brandSlice/getAll',
    async () =>{
        const {data} = await brandsService.getAllUsers();
        console.log(data, 'async thunk');
        return data
    }
)

const getById = createAsyncThunk(
    'brandSlice/getById',
    async ({_id}) =>{
        const {data} = await brandsService.getUserById(_id);
        console.log(data, 'async thunk get user by id');
        return data
    }
)

const userSlice = createSlice({
    name: 'brandSlice',
    initialState,
    reducers:{},
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
});

const {reducer: userReducer, actions: {}} = userSlice;

const userActions = {
    getAll,
    getById
}

export {
    userReducer,
    userActions
}