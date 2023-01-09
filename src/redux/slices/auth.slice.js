import {authService} from "../../services";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const initialState = {
    errors: null,
    isAuth: null
}

const forgotPasswordUser = createAsyncThunk(
    'authSlice/forgotPasswordUser',
    async ({info}, {rejectWithValue}) => {
        try {
            console.log(info, 'email in async');
            const {data} = await authService.forgotPasswordUser(info);
            return data
        } catch (e) {
            return rejectWithValue(e.response.data);
        }
    }
)

const forgotPasswordCompany = createAsyncThunk(
    'authSlice/forgotPasswordCompany',
    async ({contact_number}, {rejectWithValue}) => {
        try {
            console.log(contact_number, 'number in async');
            const {data} = await authService.forgotPasswordCompany(contact_number);
            return data
        } catch (e) {
            return rejectWithValue(e.response.data);
        }
    }
)

const resetPasswordUser = createAsyncThunk(
    'authSlice/resetPasswordUser',
    async ({password}, {rejectWithValue}) => {
        try {
            await authService.resetPasswordUser(password);
        } catch (e) {
            return rejectWithValue(e.response.data);
        }
    }
)

const resetPasswordCompany = createAsyncThunk(
    'authSlice/resetPasswordCompany',
    async ({password}, {rejectWithValue}) => {
        try {
            await authService.resetPasswordCompany(password);
        } catch (e) {
            return rejectWithValue(e.response.data);
        }
    }
)

const register = createAsyncThunk(
    'authSlice/register',
    async ({user}, {rejectWithValue}) => {
        try {
            console.log(user, 'user in async');
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
            console.log(user, 'in async');
            const {data} = await authService.loginUser(user);
            return data
        } catch (e) {
            console.log(e);
            return rejectWithValue(e.response.data);
        }
    }
)

const loginCompany = createAsyncThunk(
    'authSlice/loginCompany',
    async ({company}, {rejectWithValue}) => {
        try {
            console.log(company, 'IN ASYNC');
            const {data} = await authService.loginCompany(company);
            console.log(data, 'res in async');
            return data
        } catch (e) {
            console.log(e.response.data);
            return rejectWithValue(e.response.data);
        }
    }
)

const logoutCompany = createAsyncThunk(
    'authSlice/logoutCompany',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await authService.logoutCompany();
            console.log(data, 'res in async');
            return data
        } catch (e) {
            console.log(e.response.data);
            return rejectWithValue(e.response.data);
        }
    }
)

const logoutUser = createAsyncThunk(
    'authSlice/logoutUser',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await authService.logoutUser();
            console.log(data, 'res in async');
            return data
        } catch (e) {
            console.log(e.response.data);
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
                window.location.reload();
            })
            .addCase(logoutUser.fulfilled, (state, action) => {
                state.isAuth = false;
                console.log(action.payload);
                authService.deleteTokens();
                window.location.reload();
            })
            .addCase(loginCompany.fulfilled, (state, action) => {
                state.isAuth = true;
                console.log(action.payload);
                authService.setTokens({...action.payload});
                window.location.reload();
            })
            .addCase(logoutCompany.fulfilled, (state, action) => {
                state.isAuth = false;
                console.log(action.payload);
                authService.deleteTokens();
                window.location.reload();
            })
            .addCase(forgotPasswordUser.fulfilled, (state, action) => {
                console.log(action.payload, 'action token');
                authService.setActionToken(action.payload);
            })
            .addCase(forgotPasswordCompany.fulfilled, (state, action) => {
                console.log(action.payload, 'action token');
                authService.setActionToken(action.payload);
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
    login,
    forgotPasswordUser,
    resetPasswordUser,
    loginCompany,
    logoutCompany,
    logoutUser,
    forgotPasswordCompany,
    resetPasswordCompany
}

export {
    authReducer,
    authActions
}