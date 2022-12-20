import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../models/entities";

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

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {}
});

export default authSlice.reducer;
export const {

} = authSlice.actions;