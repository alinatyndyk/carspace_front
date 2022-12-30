import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {brandsService} from "../../services";

const initialState = {
    users: []
}

const getAll = createAsyncThunk(
    'brandSlice/getAll',
    async () =>{
        const {data} = await brandsService.getAllUsers();
        console.log(data, 'async thunk');
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
});

const {reducer: userReducer, actions: {}} = userSlice;

const userActions = {
    getAll,
}

export {
    userReducer,
    userActions
}