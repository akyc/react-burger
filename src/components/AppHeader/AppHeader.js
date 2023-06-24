import React from "react";
import { Logo, Button, ProfileIcon, BurgerIcon, ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import headerStyles from './AppHeader.module.css';

const AppHeader = () => {
    return (
        <header className="pt-4 pb-4">
            <div className={headerStyles.container}>
                <div className={headerStyles.ordersActions}>
                    <Button htmlType="button" type="secondary" size="large" extraClass={headerStyles.button}>
                        <BurgerIcon type="primary" /> Конструктор
                    </Button>

                    <Button htmlType="button" type="secondary" size="large" extraClass={headerStyles.button}>
                        <ListIcon type="primary" /> Лента заказов
                    </Button>
                </div>
                <div className={headerStyles.logotype}>
                    <Logo />
                </div>
                <div className={headerStyles.profile}>
                    <Button htmlType="button" type="secondary" size="large" extraClass={headerStyles.button}>
                        <ProfileIcon type="primary" /> Личный кабинет
                    </Button>
                </div>
            </div>
        </header>
    )
}

export default AppHeader