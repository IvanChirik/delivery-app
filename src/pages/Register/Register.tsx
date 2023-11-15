import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import styles from './Register.module.css';
import Heading from '../../components/Heading/Heading';
import { FormEvent } from 'react';

const Register = () => {
    const submitHandler = (e: FormEvent) => {
        e.preventDefault();
        console.log(e);
    };
    return (
        <div className={styles.register} >
            <Heading>
                Регистрация
            </Heading>
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
                <Button className={styles['register-button']} appearance='upper'>Регистрация</Button>
            </form>
            <div className={styles.footer}>
                Есть аккаунт?
                <Link className={styles['login-link']} to='/auth/login'>Войти</Link>
            </div>
        </div>
    );
};

export default Register;