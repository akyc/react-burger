import React from 'react'
import styles from './not-found.module.css'
import {
    Link
} from "react-router-dom";
const NotFound = () => {
    return (
        <main className={styles.main}>
            <div className={styles.inner}>
                <p className='text text_type_main-large'>Ошибка 404</p>
                <p className='ext text_type_main-small'>Старница не найдена</p>
                <Link className={`${styles.link} text text_type_main-default pt-5`} to='/'>Главная страница</Link>
            </div>
        </main>
    )
};

export default NotFound;
