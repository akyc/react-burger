import React, {
    useState,
    useEffect,
    useCallback
} from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { patchUserInfoThunk, getUserInfoThunk } from '../../services/actions/user'
import { logoutUserThunk } from '../../services/actions/login'
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './profile.module.css'
import {
    deleteCookie,
    getCookie
} from "../../utils/cookies";
import {
    checkUserAuth
} from "../../utils/api";
import {
    pageRoutes
} from "../../utils/constants";

const Profile = () => {
    const dispatch = useDispatch();
    //@ts-ignore
    const currentName = useSelector(state => state.info.user.name);
    //@ts-ignore
    const currentEmail = useSelector(state => state.info.user.email);
    const isUser = checkUserAuth();

    const [value, setValue] = useState({
        name: currentName,
        email: currentEmail,
        password: '',
    });

    const hasChanges = value.name !== currentName || value.email !== currentEmail || value.password.length > 0

    useEffect(() => {
        setValue({
            name: currentName,
            email: currentEmail,
            password: ''
        })
    }, [currentEmail, currentName])

    const saveInfo = (e:React.SyntheticEvent) => {
        e.preventDefault();
        const access = getCookie('access')
        //@ts-ignore
        dispatch(patchUserInfoThunk(value, access));
        setValue({
            name: currentName,
            email: currentEmail,
            password: ''
        })
    }

    const cancelChanges = () => {
        setValue({
            name: currentName,
            email: currentEmail,
            password: ''
        })
    }

    const logoutUser = useCallback(() => {
        //@ts-ignore
        dispatch(logoutUserThunk());
    }, [dispatch])

    const options = {
        name: 'name',
        error: false,
        errorText: 'Ошибка',
        extraClass: 'ml-1'
    }

    useEffect(() => {
        if (isUser) {
            //@ts-ignore
            dispatch(getUserInfoThunk());
        }
    }, [dispatch, isUser])

    return (
        <main className={styles.main}>
            <nav className={`${styles.nav} mr-15`}>
                <NavLink
                    to={pageRoutes.profile}
                    className={({isActive}) => `${isActive ? styles.active : ''} ${styles.tab}`}>
                    <h3 className='text text_type_main-medium mt-4 mb-8'>Профиль</h3>
                </NavLink>
                <NavLink
                    to={pageRoutes.orders}
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
            <section className={styles.section}>
                <form className={styles.section} onSubmit={saveInfo}>
                    <div className='mt-6'>
                        <Input type='text' placeholder={'Имя'} icon={'EditIcon'}
                               onChange={e => setValue({ ...value, name: e.target.value })}
                               value={value.name}
                               {...options}
                        />
                    </div>
                    <div className='mt-6'>
                        <Input type='email' placeholder={'Логин'} icon={'EditIcon'}
                               onChange={e => setValue({ ...value, email: e.target.value })}
                               value={value.email}
                               {...options} />
                    </div>
                    <div className='mt-6 mb-6'>
                        <Input type='password' placeholder={'Пароль'} icon={'EditIcon'}
                               onChange={e => setValue({ ...value, password: e.target.value })}
                               value={value.password}
                               {...options} />
                    </div>
                    {hasChanges ? <div className={styles.box}>
                        <div className={styles.button}><Button
                            onClick={cancelChanges}
                            htmlType='button'
                            type='primary'
                            size='medium'>Отмена
                        </Button></div>
                        <div className={styles.button}><Button
                            htmlType='submit'
                            type='primary'
                            size='medium'>Сохранить
                        </Button></div>
                    </div> : null}
                </form>
            </section >
        </main>
    )
};

export default Profile;
