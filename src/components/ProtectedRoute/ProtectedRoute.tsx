import React from 'react'
import { useLocation, Navigate } from 'react-router-dom'
import {pageRoutes} from "../../utils/constants"
import {
    checkUserAuth
} from "../../utils/api";

interface IProtectedRoute {
    onlyUnAuth: boolean;
    children: React.JSX.Element;
}
export const ProtectedRoute = ({ onlyUnAuth, children}: IProtectedRoute) => {
    const isUser = checkUserAuth();
    const location = useLocation();

    return onlyUnAuth ? (
        isUser ? (
            <Navigate to={pageRoutes.main} state={{ previousLocation: location }} replace />
        ) : (
            children
        )
    ) : isUser ? (
        children
    ) : (
        <Navigate to={pageRoutes.login} state={{ previousLocation: location }} replace />
    );
}
