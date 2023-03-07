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
            const {data} = await authService.forgotPasswordCompany(contact_number);
            return data
        } catch (e) {
            return rejectWithValue(e.response.data);
        }
    }
)

const resetPasswordUser = createAsyncThunk(
    'authSlice/resetPasswordUser',
    async ({password, actionToken}, {rejectWithValue}) => {
        try {
            await authService.resetPasswordUser(password, actionToken);
        } catch (e) {
            return rejectWithValue(e.response.data);
        }
    }
)

const resetPasswordCompany = createAsyncThunk(
    'authSlice/resetPasswordCompany',
    async ({password, actionToken}, {rejectWithValue}) => {
        try {
            await authService.resetPasswordCompany(password, actionToken);
        } catch (e) {
            return rejectWithValue(e.response.data);
        }
    }
)

const register = createAsyncThunk(
    'authSlice/register',
    async ({user}, {rejectWithValue}) => {
        try {
            await authService.registerUser(user);
        } catch (e) {
            return rejectWithValue(e.response.data);
        }
    }
)

const registerCompany = createAsyncThunk(
    'authSlice/registerCompany',
    async ({company}, {rejectWithValue}) => {
        try {
            await authService.registerCompany(company);
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
            console.log(data);
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
            const {data} = await authService.loginCompany(company);
            return data
        } catch (e) {
            return rejectWithValue(e.response.data);
        }
    }
)

const logoutCompany = createAsyncThunk(
    'authSlice/logoutCompany',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await authService.logoutCompany();
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
                authService.setTokens({...action.payload});
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.isAuth = false;
                authService.deleteTokens();
                window.location.reload();
            })
            .addCase(loginCompany.fulfilled, (state, action) => {
                state.isAuth = true;
                authService.setTokens({...action.payload});
            })
            .addCase(logoutCompany.fulfilled, (state) => {
                state.isAuth = false;
                authService.deleteTokens();
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

const {reducer: authReducer, actions: {}} = authSlice;

const authActions = {
    register,
    registerCompany,
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