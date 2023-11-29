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

const AppHeader: FC = () => {
    const sessionStorageLogin: string | null = sessionStorage.getItem('login')
    let login : string | null = null
    if(sessionStorageLogin) {
        login = JSON.parse(sessionStorageLogin);
    }

    return (
        <header className={`${styles.header} pt-4 pb-4`}>
            <div className={styles.container}>
                <div className={styles.ordersActions}>
                    <NavLink to={pageRoutes.main} className={`${styles.button} ${styles.active} text text_type_main-default p-5`}>
                        <BurgerIcon type='primary' /> Конструктор
                    </NavLink>
                    <NavLink to={pageRoutes.main} className={`${styles.button} text text_type_main-default p-5`}>
                        <ListIcon type='secondary' /> Лента заказов
                    </NavLink>
                </div>
                <div className={styles.logotype}>
                    <Logo />
                </div>
                <div className={styles.profile}>
                    <NavLink to={login ? { pathname: pageRoutes.profile } : { pathname: pageRoutes.login }}
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
