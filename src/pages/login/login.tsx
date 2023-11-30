import React, {
    useEffect,
    useState
} from 'react';
import { Input, Button, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import {
    Link,
    useNavigate
} from 'react-router-dom';
import { getLoginUser } from '../../services/actions/login';
import { useDispatch, useSelector } from 'react-redux';
import styles from './login.module.css'
import {
    checkUserAuth
} from "../../utils/api";
import {
    pageRoutes
} from "../../utils/constants";


const Login = () => {
    //@ts-ignore
    const login = useSelector( state => state.login.login)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        const user = {
            email,
            password
        }
        //@ts-ignore
        dispatch(getLoginUser(user))
    }
    useEffect(() => {
        if (login) {
            navigate(pageRoutes.main)
        }
    }, [login, navigate])

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
        <main className={styles.main}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <h3 className='text text_type_main-medium'>Вход</h3>
                <div className='mt-6'>
                    <Input type='email' placeholder={'E-mail'}
                           onChange={e => setEmail(e.target.value)}
                           value={email}
                           name={'name'}
                           error={false}
                           errorText={'Ошибка'} />
                </div>
                <div className='mt-6 mb-6'>
                    <PasswordInput
                        onChange={e => setPassword(e.target.value)}
                        placeholder={'Пароль'}
                        value={password} />
                </div>
                <Button
                    htmlType='submit'
                    type='primary'
                    size='medium'>Войти</Button>
            </form>
            <p className={`${styles.text} text text_type_main-default mt-20 mb-4`}>Вы - новый пользователь?
                <Link to={pageRoutes.register} className={`${styles.link} ml-2`}>Зарегистрироваться</Link></p>
            <p className={`${styles.text} text text_type_main-default`}>Забыли пароль?
                <Link to={pageRoutes.resetPassword} className={`${styles.link} ml-2`}>Восстановить пароль</Link></p>
        </main>
    )
};

export default Login;
