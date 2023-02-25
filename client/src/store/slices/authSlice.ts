import { createAsyncThunk, createSlice, isAnyOf, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../models/entities";
import { AuthResponse } from "../../models/responses";
import { loginAPI } from "../../services/AuthService";

interface AuthState {
    user: User,
    isAuth: boolean,
    isAuthLoading: boolean,
    isAuthChecking: boolean
}

const initialState: AuthState = {
    user: {} as User,
    isAuth: false,
    isAuthLoading: false,
    isAuthChecking: false
}

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

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(isAnyOf(login.fulfilled), (state, action: PayloadAction<AuthResponse>) => {
            const { user, accessToken } = action.payload;

            state.user = user;
            state.isAuth = true;
            state.isAuthLoading = false;

            localStorage.setItem('token', accessToken);
        });
        builder.addMatcher(isAnyOf(login.pending), (state) => {
            state.isAuthLoading = true;
        });
        builder.addMatcher(isAnyOf(login.rejected), (state) => {
            state.isAuthLoading = false;
        });
    }
});

export default authSlice.reducer;
export const {

} = authSlice.actions;