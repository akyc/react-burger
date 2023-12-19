import React, {
    useState,
    useCallback,
    useEffect
} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { pageRoutes, useDispatch, useSelector } from '../../utils/constants'
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { getPasswordSuccessThunk } from '../../services/actions/forgot-password'

import styles from './forgot-password.module.css'


const ForgotPassword = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const success = useSelector(state => state.resetPassword.success)

    const [email, setEmail] = useState('')

    const handleClick = useCallback((e: React.SyntheticEvent) => {
        e.preventDefault();
        dispatch(getPasswordSuccessThunk(email));
    }, [dispatch, email])

    useEffect(() => {
        success ? navigate(pageRoutes.resetPassword) : navigate(pageRoutes.forgotPassword)
    }, [success, navigate])

    return (
        <main className={styles.main}>
            <form className={styles.form} onSubmit={handleClick}>
                <h3 className='text text_type_main-medium'>Восстановление пароля</h3>
                <div className='mt-6 mb-6'>
                    <Input type='email' placeholder={'Укажите e-mail'}
                           onChange={e => setEmail(e.target.value)}
                           value={email}
                           name={'email'}
                           error={false}
                           errorText={'Ошибка'} />
                </div>
                <Button
                    htmlType='submit'
                    type='primary'
                    size='medium'
                >Восстановить</Button>
                <p className={`${styles.text} text text_type_main-default mt-20 mb-4`}>Вспомнили пароль?
                    <Link to={pageRoutes.login} className={`${styles.link} ml-2`}>Войти</Link></p>
            </form>
        </main>
    )
};

export default ForgotPassword;
