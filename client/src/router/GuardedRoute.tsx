import { ComponentType } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../hooks/redux";

interface GuardedRouteProps {
    path: string,
    element: ComponentType
}

export const GuardedRoute = ({ path, element: RouteComponent }: GuardedRouteProps) => {

    const { isAuth } = useAppSelector(state => state.auth);

    return isAuth ? <RouteComponent /> : <Navigate to="/login" />;
}
