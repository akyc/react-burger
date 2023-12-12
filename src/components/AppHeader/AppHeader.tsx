import React, {
    FC
} from 'react'
import {
    BurgerIcon,
    ListIcon,
    Logo,
    ProfileIcon
} from '@ya.praktikum/react-developer-burger-ui-components'
import styles
    from './AppHeader.module.css'
import {
    NavLink
} from 'react-router-dom'
import {
    pageRoutes
} from '../../utils/constants'
import {
    checkUserAuth
} from "../../utils/api";

const AppHeader: FC = () => {
    const isUser = checkUserAuth()

    return (
        <header className={`${styles.header} pt-4 pb-4`}>
            <div className={styles.container}>
                <div className={styles.ordersActions}>
                    <NavLink to={pageRoutes.main} className={`${styles.button} ${styles.active} text text_type_main-default p-5`}>
                        <BurgerIcon type='primary' /> Конструктор
                    </NavLink>
                    <NavLink to={pageRoutes.feed} className={`${styles.button} text text_type_main-default p-5`}>
                        {({isActive}) => (
                            <>
                                <ListIcon type={isActive ? 'primary' : 'secondary'} />
                                <span className={isActive ? `${styles.active}` : ''}>Лента заказов</span>
                            </>
                        )}
                    </NavLink>
                </div>
                <div className={styles.logotype}>
                    <Logo />
                </div>
                <div className={styles.profile}>
                    <NavLink to={isUser ? { pathname: pageRoutes.profile } : { pathname: pageRoutes.login }}
                             className={`${styles.button} text text_type_main-default p-5`}
                    >
                        {({isActive}) => (
                            <>
                                <ProfileIcon type={isActive ? 'primary' : 'secondary'} />
                                <span className={isActive ? `${styles.active}` : ''}>Личный кабинет</span>
                            </>
                        )}
                    </NavLink>
                </div>
            </div>
        </header>
    )
}

export default AppHeader
