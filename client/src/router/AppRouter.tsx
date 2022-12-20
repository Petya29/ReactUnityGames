import { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../hooks/redux";
import { Home } from "../pages/Home";
import { GuardedRoute } from "./GuardedRoute";
import { routes } from "./routes";

const authExeptions = ['/login', '/register', '/forgot-password'];

export const AppRouter = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const { isAuth } = useAppSelector(state => state.auth);

    useEffect(() => {
        if (isAuth && authExeptions.includes(location.pathname)) {
            navigate('/');
        }
    }, [location]);

    return (
        <Routes>
            {routes.map(route => (
                <Route
                    path={route.path}
                    element={
                        route.protected
                            ?
                            <GuardedRoute path={route.path} element={route.element} />
                            :
                            <route.element />
                    }
                    key={route.id}
                />
            ))}
            <Route
                path='*'
                element={<Home />}
            />
        </Routes>
    )
}
