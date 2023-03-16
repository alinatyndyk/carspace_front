import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {brandsService} from "../../services";

const initialState = {
    brands: [],
    errors: null
}

const getAll = createAsyncThunk(
    'brandSlice/getAllUsers',
    async () =>{
        const {data} = await brandsService.getAll();
        return data
    }
)

const create = createAsyncThunk(
    'brandSlice/create',
    async ({object}, {rejectWithValue}) => {
        try {
            const {data} = await brandsService.create(object);
            return data
        } catch (e) {
            return rejectWithValue(e.response.data);
        }
    }
)

const deleteById = createAsyncThunk(
    'brandSlice/deleteById',
    async ({_id}, {rejectWithValue}) => {
        try {
            const {data} = await brandsService.deleteById(_id);
            return data
        } catch (e) {
            return rejectWithValue(e.response.data);
        }
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
            .addDefaultCase((state, action) => {
                const [type] = action.type.split('/').splice(-1);
                if (type === 'rejected') {
                    state.errors = action.payload
                } else {
                    state.errors = null;
                }
            })
});

const {reducer: brandReducer, actions: {}} = brandSlice;

const brandActions = {
    getAll,
    deleteById,
    create
}

export {
    brandReducer,
    brandActions
}