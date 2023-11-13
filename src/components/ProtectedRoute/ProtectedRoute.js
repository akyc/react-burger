import { useLocation, Navigate } from 'react-router-dom'
import PropTypes from 'prop-types'

export const ProtectedRoute = ({ children }) => {
    const login = JSON.parse(sessionStorage.getItem('login'));
    const location = useLocation();

    if(!login){
        return (
            <Navigate to="/login" state={{ from: location }} replace />
        )
    }
    return children
}

ProtectedRoute.propTypes = {
    children: PropTypes.element.isRequired
}
