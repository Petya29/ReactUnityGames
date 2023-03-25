import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import gameSlice from './slices/gameSlice';
import utilsSlice from './slices/utilsSlice';

const rootReducer = combineReducers({
    auth: authSlice,
    game: gameSlice,
    utils: utilsSlice
});

const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    });
}

export const store = setupStore();
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];