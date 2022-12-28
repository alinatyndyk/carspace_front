import {authService} from "../../services";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const initialState = {
    errors: null,
    isAuth: null
}

const register = createAsyncThunk(
    'authSlice/register',
    async ({user}, {rejectWithValue}) => {
        try {
            await authService.registerUser(user)
        } catch (e) {
            return rejectWithValue(e.response.data);
        }
    }
)

const login = createAsyncThunk(
    'authSlice/login',
    async ({user}, {rejectWithValue}) => {
        try {
            const {data} = await authService.loginUser(user);
            return data
        } catch (e) {
            console.log(e);
            return rejectWithValue(e.response.data);
        }
    }
)

const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) =>
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.isAuth = true;
                console.log(action.payload);
                authService.setTokens({...action.payload});
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

const {reducer: authReducer, actions: {}} = authSlice;

const authActions = {
    register,
    login
}

export {
    authReducer,
    authActions
}