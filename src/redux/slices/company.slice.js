import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {companyService} from "../../services";


const initialState = {
    companies: [],
    company: {},
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
            .addCase(update.fulfilled, (state, action) => {
                console.log(action.payload, 'ap in addcase update');
                const currentCompany = state.companies.find(value => value === action.payload._id)
                Object.assign(currentCompany, action.payload)
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
    }
});

const {reducer: companyReducer, actions: {setCompanyForUpdate}} = companySlice;

const companyActions = {
    getAll,
    getById,
    update,
    setCompanyForUpdate
}

export {
    companyReducer,
    companyActions
}