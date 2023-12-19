import {
    NavLink
} from "react-router-dom";
import {
    pageRoutes,
    useDispatch
} from "../../utils/constants";
import React
    , {
    useCallback
} from "react";
import {
    logoutUserThunk
} from "../../services/actions/login";
import styles from './ProfileNav.module.css'

export const ProfileNav = () => {
    const dispatch = useDispatch()
    const logoutUser = useCallback(() => {
        dispatch(logoutUserThunk());
    }, [dispatch])
    return (
        <nav className={`${styles.nav} mr-15`}>
            <NavLink
                to={pageRoutes.profile}
                className={({isActive}) => `${isActive ? styles.active : ''} ${styles.tab}`}>
                <h3 className='text text_type_main-medium mt-4 mb-8'>Профиль</h3>
            </NavLink>
            <NavLink
                to={`${pageRoutes.profile}${pageRoutes.orders}`}
                className={({isActive}) => `${isActive ? styles.active : ''} ${styles.tab}`}>
                <h3 className='text text_type_main-medium mb-8'>История заказов</h3>
            </NavLink>
            <NavLink
                to={pageRoutes.main}
                className={({isActive}) => `${isActive ? styles.active : ''} ${styles.tab}`}>
                <h3 onClick={logoutUser} className='text text_type_main-medium mb-4'>Выход</h3>
            </NavLink>
            <p className={`${styles.text} text text_type_main-small mt-20`}>В этом разделе вы можете
                изменять свои персональные данные</p>
        </nav>
    )
}
