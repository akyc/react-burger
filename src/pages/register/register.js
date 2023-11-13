import React, {useState} from 'react';
import { Link, Navigate } from 'react-router-dom'
import { getRegisterUser } from '../../services/actions/register'
import { useDispatch, useSelector } from 'react-redux'
import { Input, Button, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './register.module.css'
const Register = () => {
    const success = useSelector(state => state.user.success);
    const login = JSON.parse(sessionStorage.getItem('login'));

    const dispatch = useDispatch()
    const handleRegister = (e) => {
        e.preventDefault();
        const user = {
            name: value.name,
            email: value.email,
            password: value.password
        };
        dispatch(getRegisterUser(user));
    }

    const [value, setValue] = useState({
        name: '',
        email: '',
        password: ''
    });

    if (login) {
        return (<Navigate to={'/profile'}/>)
    }

    return (
        <main className={styles.main}>
            <form className={styles.form} onSubmit={handleRegister}>
                <h3 className='text text_type_main-medium'>Регистрация</h3>
                <div className='mt-6 mb-6'>
                    <Input type='text' placeholder={'Имя'}
                           onChange={e => setValue({ ...value, name: e.target.value })}
                           value={value.name}
                           name={'name'}
                           error={false}
                           errorText={'Ошибка'} />
                </div>
                <Input type='email' placeholder={'E-mail'}
                       onChange={e => setValue({ ...value, email: e.target.value })}
                       value={value.email}
                       name={'name'}
                       error={false}
                       errorText={'Ошибка'} />
                <div className='mt-6 mb-6'>
                    <PasswordInput
                        onChange={e => setValue({ ...value, password: e.target.value })}
                        value={value.password}
                        type='password' placeholder={'Пароль'} icon={'ShowIcon'} />
                </div>
                <Button
                    htmlType='submit'
                    type='primary'
                    size='medium'>Зарегистрироваться</Button>
                <p className={`${styles.text} text text_type_main-default mt-20 mb-4`}>Уже зарегистрированы?
                    <Link to='/login' className={`${styles.link} ml-2`}>Войти</Link></p>
                {success ? <Navigate to={'/login'} /> : <Navigate to={'/register'} />}
            </form>
        </main >
    )
};

export default Register;
