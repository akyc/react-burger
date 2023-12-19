import React, {
    useState,
    useEffect,
    useCallback
} from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from '../../utils/constants'
import { patchUserInfoThunk, getUserInfoThunk } from '../../services/actions/user'
import { logoutUserThunk } from '../../services/actions/login'
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './profile.module.css'
import {
    getCookie
} from "../../utils/cookies";
import {
    checkUserAuth
} from "../../utils/api";
import {
    pageRoutes
} from "../../utils/constants";
import {
    ProfileNav
} from "../../components/ProfileNav/ProfileNav";

const Profile = () => {
    const dispatch = useDispatch();
    const currentName = useSelector(state => state.info.user.name);
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


    const options = {
        name: 'name',
        error: false,
        errorText: 'Ошибка',
        extraClass: 'ml-1'
    }

    useEffect(() => {
        if (isUser) {
            dispatch(getUserInfoThunk());
        }
    }, [dispatch, isUser])

    return (
        <main className={styles.main}>
            <ProfileNav />
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
