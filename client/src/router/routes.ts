import { FC } from "react";
import { Login } from "../pages/auth/Login";
import { Registration } from "../pages/auth/Registration";
import { Game } from "../pages/games/Game";
import { GamesList } from "../pages/games/GamesList";
import { Home } from "../pages/Home";
import { Profile } from "../pages/user/Profile";

interface Route {
    id: number,
    protected: boolean,
    path: string,
    element: FC
}

export const routes: Route[] = [
    {
        id: 1,
        protected: false,
        path: '/',
        element: Home
    },
    {
        id: 2,
        protected: false,
        path: '/login',
        element: Login
    },
    {
        id: 3,
        protected: false,
        path: '/registration',
        element: Registration
    },
    {
        id: 4,
        protected: true,
        path: '/profile',
        element: Profile
    },
    {
        id: 5,
        protected: false,
        path: '/games',
        element: GamesList
    },
    {
        id: 6,
        protected: false,
        path: 'games/:gameId',
        element: Game
    }
];