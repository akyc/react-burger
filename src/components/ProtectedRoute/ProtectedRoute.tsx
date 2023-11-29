import {
    FC,
    ReactNode
} from 'react'
import { useLocation, Navigate } from 'react-router-dom'
import {pageRoutes} from "../../utils/constants"

interface IProtectedRoute {
    onlyUnAuth: boolean;
    children: ReactNode
}
export const ProtectedRoute = ({ onlyUnAuth, children }):IProtectedRoute => {
    const login = JSON.parse(sessionStorage.getItem('login'));
    const location = useLocation();

    if(!login){
        return (
            <Navigate to={pageRoutes.login} state={{ from: location }} replace />
        )
    }
    return children
}

