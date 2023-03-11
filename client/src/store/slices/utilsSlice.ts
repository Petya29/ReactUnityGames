import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Mode, Snackbar } from "../../models/entities";

interface UtilsState {
    mode: Mode | undefined,
    snackbar: Snackbar
}

const initialState: UtilsState = {
    mode: undefined,
    snackbar: {
        open: false,
        severity: 'info',
        text: ''
    }
}

export const utilsSlice = createSlice({
    name: 'utils',
    initialState,
    reducers: {
        setMode(state, action: PayloadAction<Mode>) {
            state.mode = action.payload;
        },
        setSnackbar(state, action: PayloadAction<Snackbar>) {
            state.snackbar = action.payload;
        }
    },
});

export default utilsSlice.reducer;
export const {
    setMode,
    setSnackbar
} = utilsSlice.actions;