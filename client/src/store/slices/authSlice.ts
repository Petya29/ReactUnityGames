import { createAsyncThunk, createSlice, isAnyOf, PayloadAction } from "@reduxjs/toolkit";
import { Lang, User } from "../../models/entities";
import { AuthResponse } from "../../models/responses";
import { editUserAPI, loginAPI, logoutAPI, refreshAuthAPI, registrationAPI } from "../../services/AuthService";

interface AuthState {
    user: User,
    authError: {
        isError: boolean,
        msg: string
    },
    isAuth: boolean,
    isAuthLoading: boolean,
    isAuthChecking: boolean
}

const initialState: AuthState = {
    user: {} as User,
    authError: {
        isError: false,
        msg: ''
    },
    isAuth: false,
    isAuthLoading: false,
    isAuthChecking: true
}

export const registration = createAsyncThunk(
    'auth/registration',
    async ({
        nickname,
        email,
        password,
        confirmPassword,
        region,
        lang
    }: {
        nickname: string,
        email: string,
        password: string,
        confirmPassword: string,
        region: string,
        lang: string
    }, { rejectWithValue }) => {
        try {
            const response = await registrationAPI(nickname, email, password, confirmPassword, region, lang);
            return response.data;
        } catch (e: any) {
            return rejectWithValue(e.response?.data?.errors || 'Unexpected error');
        }
    }
);

export const login = createAsyncThunk(
    'auth/login',
    async ({ email, password }: { email: string, password: string }, { rejectWithValue }) => {
        try {
            const response = await loginAPI(email, password);
            return response.data;
        } catch (e: any) {
            return rejectWithValue(e.response?.data?.errors || 'Unexpected error');
        }
    }
);

export const editUser = createAsyncThunk(
    'auth/editUser',
    async ({ nickname, lang }: { nickname?: string, lang?: keyof typeof Lang }, { rejectWithValue }) => {
        try {
            const response = await editUserAPI(nickname, lang);
            return response.data;
        } catch (e: any) {
            return rejectWithValue(e.response?.data?.errors || 'Unexpected error');
        }
    }
);

export const refreshAuth = createAsyncThunk(
    'auth/refreshAuth',
    async (_, { rejectWithValue }) => {
        try {
            const response = await refreshAuthAPI();
            return response.data;
        } catch (e: any) {
            return rejectWithValue(e.response?.data?.errors || 'Unexpected error');
        }
    }
);

export const logout = createAsyncThunk(
    'auth/logout',
    async (_, { rejectWithValue }) => {
        try {
            const response = await logoutAPI();
            return response.data;
        } catch (e: any) {
            return rejectWithValue(e.response?.data?.errors || 'Unexpected error');
        }
    }
);

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsAuthChecking(state, actions: PayloadAction<boolean>) {
            state.isAuthChecking = actions.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(editUser.fulfilled, (state, action: PayloadAction<User>) => {
            state.user = action.payload;
        });
        builder.addCase(logout.fulfilled, () => {
            localStorage.removeItem('token');
            return {
                ...initialState,
                isAuthChecking: false
            };
        });
        builder.addMatcher(isAnyOf(registration.fulfilled, login.fulfilled, refreshAuth.fulfilled), (state, action: PayloadAction<AuthResponse>) => {
            const { user, accessToken } = action.payload;

            state.user = user;
            state.isAuth = true;
            state.isAuthLoading = false;
            state.authError = {
                isError: true,
                msg: ''
            };

            localStorage.setItem('token', accessToken);
        });
        builder.addMatcher(isAnyOf(registration.pending, login.pending, logout.pending), (state) => {
            state.isAuthLoading = true;
        });
        builder.addMatcher(isAnyOf(registration.rejected, login.rejected, refreshAuth.rejected, logout.rejected), (state) => {
            state.isAuthLoading = false;
            state.authError = {
                isError: true,
                msg: 'Unexpected error'
            }
        });
    }
});

export default authSlice.reducer;
export const {
    setIsAuthChecking
} = authSlice.actions;