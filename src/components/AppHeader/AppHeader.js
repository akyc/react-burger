import React from 'react'
import { Logo, Button, ProfileIcon, BurgerIcon, ListIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './AppHeader.module.css'

const AppHeader = () => {
    return (
        <header className={`${styles.header} pt-4 pb-4`}>
            <div className={styles.container}>
                <div className={styles.ordersActions}>
                    <Button htmlType='button' type='secondary' size='large' extraClass={styles.button}>
                        <BurgerIcon type='primary' /> Конструктор
                    </Button>

                    <Button htmlType='button' type='secondary' size='large' extraClass={styles.button}>
                        <ListIcon type='primary' /> Лента заказов
                    </Button>
                </div>
                <div className={styles.logotype}>
                    <Logo />
                </div>
                <div className={styles.profile}>
                    <Button htmlType='button' type='secondary' size='large' extraClass={styles.button}>
                        <ProfileIcon type='primary' /> Личный кабинет
                    </Button>
                </div>
            </div>
        </header>
    )
}

export default AppHeader