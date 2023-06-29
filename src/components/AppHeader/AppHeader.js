import React from 'react'
import { Logo, ProfileIcon, BurgerIcon, ListIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './AppHeader.module.css'

const AppHeader = () => {
    return (
        <header className={`${styles.header} pt-4 pb-4`}>
            <div className={styles.container}>
                <div className={styles.ordersActions}>
                    <a href='/' className={`${styles.button} text text_type_main-default p-5`}><BurgerIcon type='primary' /> Конструктор</a>
                    <a href='/' className={`${styles.button} text text_type_main-default p-5`}><ListIcon type='primary' /> Лента заказов</a>
                </div>
                <div className={styles.logotype}>
                    <Logo />
                </div>
                <div className={styles.profile}>
                    <a href='/' className={`${styles.button} text text_type_main-default p-5`}><ProfileIcon type='primary' /> Личный кабинет</a>
                </div>
            </div>
        </header>
    )
}

export default AppHeader