import { createAsyncThunk, createSlice, isAnyOf, PayloadAction } from "@reduxjs/toolkit";
import { Game, UserScore } from "../../models/entities";
import { getGamesAPI, getScoresAPI, getUserScoreAPI, saveScoreAPI } from "../../services/GameService";

interface GameState {
    games: Game[],
    scores: UserScore[],
    userScores: UserScore[]
}

const initialState: GameState = {
    games: [],
    scores: [],
    userScores: []
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

export const getScores = createAsyncThunk(
    'game/getScores',
    async ({ gameId, region }: { gameId: string, region?: string }, { rejectWithValue }) => {
        try {
            const response = await getScoresAPI(gameId, region);
            return response.data;
        } catch (e: any) {
            return rejectWithValue(e.response?.data?.errors || 'Unexpected error');
        }
    }
);

export const getUserScore = createAsyncThunk(
    'game/getUserScore',
    async ({ gameId }: { gameId: string }, { rejectWithValue }) => {
        try {
            const response = await getUserScoreAPI(gameId);
            return response.data;
        } catch (e: any) {
            return rejectWithValue(e.response?.data?.errors || 'Unexpected error');
        }
    }
);

export const saveScore = createAsyncThunk(
    'game/saveScore',
    async ({
        gameId,
        score,
        level,
        region
    }: {
        gameId: string,
        score: number,
        level?: number,
        region?: string
    }, { rejectWithValue }) => {
        try {
            const response = await saveScoreAPI(gameId, score, level, region);
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
        resetGameSlice: () => initialState
    },
    extraReducers: (builder) => {
        builder.addCase(getGames.fulfilled, (state, action: PayloadAction<Game[]>) => {
            state.games = action.payload;
        });
        builder.addCase(getScores.fulfilled, (state, action: PayloadAction<UserScore[]>) => {
            state.scores = action.payload;
        });
        builder.addMatcher(isAnyOf(getUserScore.fulfilled, saveScore.fulfilled), (state, action: PayloadAction<UserScore | null>) => {
            if (!action.payload) return;

            const scoresIndex = state.scores.findIndex(score => {
                return (
                    score.userId === action.payload?.userId &&
                    score.gameId === action.payload.gameId &&
                    score.region === action.payload.region
                );
            });

            if (scoresIndex !== -1) {
                state.scores[scoresIndex] = action.payload;
            } else {
                state.scores.push(action.payload);
            }
            state.scores.sort((a, b) => b.score - a.score);

            const userScoreIndex = state.userScores.findIndex(userScore => {
                return userScore.gameId === action.payload?.gameId;
            });

            if (userScoreIndex !== -1) {
                state.userScores[userScoreIndex] = action.payload;
            } else {
                state.userScores.push(action.payload);
            }
        });
    }
});

export default gameSlice.reducer;
export const {
    resetGameSlice
} = gameSlice.actions;