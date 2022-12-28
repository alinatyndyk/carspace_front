import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {brandsService} from "../../services";

const initialState = {
    brands: []
}

const getAll = createAsyncThunk(
    'brandSlice/getAll',
    async () =>{
        const {data} = await brandsService.getAll();
        console.log(data, 'async thunk');
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
                console.log(action.payload, 'action payload');
                state.brands = action.payload;
            })
});

const {reducer: brandReducer, actions: {}} = brandSlice;

const brandActions = {
    getAll,
}

export {
    brandReducer,
    brandActions
}