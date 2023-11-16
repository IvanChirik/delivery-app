import { Link, useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import Heading from '../../components/Heading/Heading';
import { FormEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { login, userActions } from '../../store/user.state';

type EventTarget = {
    email: {
        value: string
    },
    password: {
        value: string
    }
}
const Login = () => {
    const { token, loginErrorMessage } = useSelector((s: RootState) => s.user);
    const navigate = useNavigate();
    useEffect(() => {
        if (token)
            navigate('/');
    }, [token, navigate]);
    const dispatch = useDispatch<AppDispatch>();
    const submitHandler = async (e: FormEvent) => {
        e.preventDefault();
        dispatch(userActions.cleanLoginErrorMessage());
        const target = e.target as typeof e.target & EventTarget;
        const { email, password } = target;
        await sendLogin(email.value, password.value);
    };
    const sendLogin = async (email: string, password: string) => {
        dispatch(login({ email, password }));
    };
    return (
        <div className={styles.login}>
            <Heading>
                Вход
            </Heading>
            {loginErrorMessage && <div className={styles.error}>{loginErrorMessage}</div>}
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