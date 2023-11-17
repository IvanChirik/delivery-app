import { Link, useNavigate } from 'react-router-dom';
import styles from './Register.module.css';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import Heading from '../../components/Heading/Heading';
import { FormEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { register, userActions } from '../../store/user.state';

type RegisterForm = {
    email: {
        value: string
    },
    password: {
        value: string
    },
    name: {
        value: string
    }
}
const Register = () => {
    const { token, registerErrorMessage } = useSelector((s: RootState) => s.user);
    const navigate = useNavigate();
    useEffect(() => {
        if (token)
            navigate('/');
    }, [token, navigate]);
    const dispatch = useDispatch<AppDispatch>();
    const submitHandler = async (e: FormEvent) => {
        e.preventDefault();
        dispatch(userActions.cleanRegisterErrorMessage());
        const target = e.target as typeof e.target & RegisterForm;
        const { email, password, name } = target;
        dispatch(register({
            email: email.value,
            password: password.value,
            name: name.value
        }));
    };
    return (
        <div className={styles.register}>
            <Heading>
                Регистрация
            </Heading>
            {registerErrorMessage && <div className={styles.error}>{registerErrorMessage}</div>}
            <form className={styles['register-form']} onSubmit={submitHandler}>
                <div className={styles.input}>
                    <label htmlFor='email'>Ваш email</label>
                    <Input placeholder='Email' id='email' name='email' type='email' />
                </div>
                <div className={styles.input}>
                    <label htmlFor='password'>Ваш пароль</label>
                    <Input placeholder='Пароль' id='password' name='password' type='password' />
                </div>
                <div className={styles.input}>
                    <label htmlFor='name'>Ваше имя</label>
                    <Input placeholder='Имя' id='name' name='name' type='text' />
                </div>
                <Button className={styles['register-button']} appearance='upper'>Зарегестрироваться</Button>
            </form>
            <div className={styles.footer}>
                Есть аккаунт?
                <Link className={styles['login-link']} to='/auth/login'>Войти</Link>
            </div>
        </div >
    );
};

export default Register;