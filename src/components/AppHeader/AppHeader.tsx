import React from 'react'
import { Logo, ProfileIcon, BurgerIcon, ListIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './AppHeader.module.css'
import { NavLink } from 'react-router-dom';


const AppHeader = () => {
    const sessionStorageLogin: string | null = sessionStorage.getItem('login')
    let login : string | null = null
    if(sessionStorageLogin) {
        login = JSON.parse(sessionStorageLogin);
    }

    return (
        <header className={`${styles.header} pt-4 pb-4`}>
            <div className={styles.container}>
                <div className={styles.ordersActions}>
                    <NavLink to={'/'} className={`${styles.button} ${styles.active} text text_type_main-default p-5`}>
                        <BurgerIcon type='primary' /> Конструктор
                    </NavLink>
                    <NavLink to={'/'} className={`${styles.button} text text_type_main-default p-5`}>
                        <ListIcon type='secondary' /> Лента заказов
                    </NavLink>
                </div>
                <div className={styles.logotype}>
                    <Logo />
                </div>
                <div className={styles.profile}>
                    <NavLink to={login ? { pathname: '/profile' } : { pathname: '/login' }}
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
