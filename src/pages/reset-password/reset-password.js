import React, {
    useCallback,
    useState
} from 'react'
import { Link, Navigate } from 'react-router-dom';
import { getPasswordRecoverThunk } from '../../services/actions/reset-password'
import {
    useDispatch,
    useSelector
} from 'react-redux'
import { Input, Button, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './reset-password.module.css'
const ResetPassword = () => {
    const reset = useSelector(state => state.resetPassword.success)
    const recovered = useSelector(state => state.recoverPassword.success)
    const dispatch = useDispatch()
    const [password, setPassword] = useState('')
    const [token, setToken] = useState('')

    const handleClick = useCallback((e) => {
        e.preventDefault();
        dispatch(getPasswordRecoverThunk(password, token));
    }, [dispatch, password, token])


    const login = JSON.parse(sessionStorage.getItem('login'));
    if (login) {
        return (<Navigate to={'/profile'} />)
    }

    if (!reset) {
       return (<Navigate to={'/forgot-password'} />)
    }

    if (recovered) {
       return (<Navigate to={'/login'} />)
    }

    return (
        <main className={styles.main}>
            <form className={styles.form} onSubmit={handleClick}>
                <h3 className='text text_type_main-medium'>Восстановление пароля</h3>
                <div className='mt-6'>
                    <PasswordInput
                        onChange={e => setPassword(e.target.value)}
                        type='password' placeholder={'Пароль'}
                        value={password} />
                </div>
                <div className='mt-6 mb-6'>
                    <Input type='text' placeholder={'Введите код из письма'}
                           onChange={e => setToken(e.target.value)}
                           value={token}
                           name={'token'}
                           error={false}
                           errorText={'Ошибка'}
                    />
                </div>
                <Button
                    htmlType='submit'
                    type='primary'
                    size='medium'>Сохранить</Button>
                <p className={`${styles.text} text text_type_main-default mt-20 mb-4`}>Вспомнили пароль?
                    <Link to='/login' className={`${styles.link} ml-2`}>Войти</Link></p>
            </form>
        </main >
    )
};

export default ResetPassword;
