import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {brandsService} from "../../services";

const initialState = {
    brands: []
}

const getAll = createAsyncThunk(
    'brandSlice/getAllUsers',
    async () =>{
        const {data} = await brandsService.getAll();
        return data
    }
)

const brandSlice = createSlice({
    name: 'brandSlice',
    initialState,
    reducers:{},
    extraReducers: (builder) =>
        builder
            .addCase(getAll.fulfilled, (state, action) => {
                state.brands = action.payload;
            })
});

const {reducer: brandReducer, actions: {}} = brandSlice;

const brandActions = {
    getAll
}

export {
    brandReducer,
    brandActions
}