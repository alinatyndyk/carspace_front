import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {carService, companyService} from "../../services";


const initialState = {
    companies: [],
    company: {},
    orders: [],
    order: [],
    companyForUpdate: null,
    errors: null
}

const getAll = createAsyncThunk(
    'authSlice/getAll',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await companyService.getAll()
            return data
        } catch (e) {
            return rejectWithValue(e.response.data);
        }
    }
)

const getCompanyOrders = createAsyncThunk(
    'authSlice/getCompanyOrders',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await companyService.getCompanyOrders();
            return data
        } catch (e) {
            return rejectWithValue(e.response.data);
        }
    }
)

const getCompanyOrderById = createAsyncThunk(
    'authSlice/getCompanyOrderById',
    async ({_id}, {rejectWithValue}) => {
        try {
            const {data} = await companyService.getCompanyOrderById(_id);
            return data
        } catch (e) {
            return rejectWithValue(e.response.data);
        }
    }
)

const getCompanyOrdersToday = createAsyncThunk(
    'authSlice/getCompanyOrdersToday',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await companyService.getCompanyOrdersToday();
            return data
        } catch (e) {
            return rejectWithValue(e.response.data);
        }
    }
)

const update = createAsyncThunk(
    'authSlice/update',
    async ({_id, company}, {rejectWithValue}) => {
        try {
            const {data} = await companyService.updateById(_id, company)
            return data
        } catch (e) {
            return rejectWithValue(e.response.data);
        }
    }
)

const getById = createAsyncThunk(
    'authSlice/getById',
    async ({_id}, {rejectWithValue}) => {
        try {
            const {data} = await companyService.getById(_id)
            return data
        } catch (e) {
            return rejectWithValue(e.response.data);
        }
    }
)

const deleteCarOrder = createAsyncThunk(
    'companySlice/deleteCarOrder',
    async ({_id}, {rejectWithValue}) => {
        try {
            const {data} = await carService.deleteCarOrder(_id);
            return data
        } catch (e) {
            return rejectWithValue(e.response.data);
        }
    }
)

const companySlice = createSlice({
    name: 'companySlice',
    initialState,
    reducers: {
        setCompanyForUpdate: (state, action) => {
            state.companyForUpdate = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAll.fulfilled, (state, action) => {
                state.companies = action.payload;
            })
            .addCase(getById.fulfilled, (state, action) => {
                state.company = action.payload;
            })
            .addCase(getCompanyOrders.fulfilled, (state, action) => {
                state.orders = action.payload;
            })
            .addCase(getCompanyOrderById.fulfilled, (state, action) => {
                state.order = action.payload;
            })
            .addCase(getCompanyOrdersToday.fulfilled, (state, action) => {
                state.orders = action.payload;
            })
            .addCase(update.fulfilled, () => {
                window.location.reload();
            })
            .addCase(deleteCarOrder.fulfilled, () => {
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
    }
});

const {reducer: companyReducer, actions: {setCompanyForUpdate}} = companySlice;

const companyActions = {
    getAll,
    getById,
    update,
    setCompanyForUpdate,
    getCompanyOrders,
    getCompanyOrdersToday,
    getCompanyOrderById,
    deleteCarOrder
}

export {
    companyReducer,
    companyActions
}