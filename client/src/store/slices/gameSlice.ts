import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Game } from "../../models/entities";
import { getGamesAPI } from "../../services/GameService";

interface GameState {
    games: Game[]
}

const initialState: GameState = {
    games: []
}

export const getGames = createAsyncThunk(
    'game/getGames',
    async (_, { rejectWithValue }) => {
        try {
            const response = await getGamesAPI();
            return response.data;
        } catch (e: any) {
            return rejectWithValue(e.response?.data?.errors || 'Unexpected error');
        }
    }
);

export const gameSlice = createSlice({
    name: 'game',
    initialState: initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getGames.fulfilled, (state, action: PayloadAction<Game[]>) => {
            state.games = action.payload;
        });
    }
});

export default gameSlice.reducer;
export const {

} = gameSlice.actions;