import { Link } from 'react-router-dom';
import styles from './Login.module.css';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import Heading from '../../components/Heading/Heading';
import { FormEvent, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { PREFIX } from '../../helpers/API';

type EventTarget = {
    email: {
        value: string
    },
    password: {
        value: string
    }
}
const Login = () => {
    const [error, setError] = useState<string | null>(null);
    const submitHandler = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);
        const target = e.target as typeof e.target & EventTarget;
        const { email, password } = target;
        await sendLogin(email.value, password.value);
    };
    const sendLogin = async (email: string, password: string) => {
        try {
            const { data } = await axios.post(`${PREFIX}/auth/login`, {
                email,
                password
            });
            console.log(data);
        }
        catch (e) {
            if (e instanceof AxiosError) {
                setError(e.response?.data.message);
                console.log(e.response?.data.message);
            }
        }
    };
    return (
        <div className={styles.login}>
            <Heading>
                Вход
            </Heading>
            {error && <div className={styles.error}>{error}</div>}
            <form className={styles['login-form']} onSubmit={submitHandler}>
                <div className={styles.input}>
                    <label htmlFor='email'>Ваш email</label>
                    <Input placeholder='Email' id='email' name='email' type='email' />
                </div>
                <div className={styles.input}>
                    <label htmlFor='password'>Ваш пароль</label>
                    <Input placeholder='Пароль' id='password' name='password' type='password' />
                </div>
                <Button className={styles['login-button']} appearance='upper'>Вход</Button>
            </form>
            <div className={styles.footer}>
                Нет аккаунта?
                <Link className={styles['register-link']} to='/auth/register'>Зарегестрироваться</Link>
            </div>
        </div>
    );
};

export default Login;