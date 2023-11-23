import { Link, useNavigate } from 'react-router-dom';
import styles from './Register.module.css';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import Heading from '../../components/Heading/Heading';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { registerUser, userActions } from '../../store/user.state';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import cn from 'classnames';
import { validateEmail, validatePassword } from '../../helpers/valaidate';

interface IRegisterFormData {
    email: string,
    password: string,
    name: string
}

const Register = () => {
    const { token, registerErrorMessage } = useSelector((s: RootState) => s.user);
    const { register, handleSubmit, formState: { errors } } = useForm<IRegisterFormData>();
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch(userActions.cleanRegisterErrorMessage());
        }, 3000);
        return () => clearTimeout(timer);
    }, [dispatch, registerErrorMessage]);
    useEffect(() => {
        if (token)
            navigate('/');
    }, [token, navigate]);
    const submit: SubmitHandler<IRegisterFormData> = (data) => {
        dispatch(userActions.cleanRegisterErrorMessage());
        dispatch(registerUser({ email: data.email, password: data.password, name: data.name }));
    };
    const error: SubmitErrorHandler<IRegisterFormData> = data => {
        console.log(data);
    };
    return (
        <div className={styles.register}>
            <Heading>
                Регистрация
            </Heading>
            {registerErrorMessage && <div className={styles.error}>{registerErrorMessage}</div>}
            <form className={styles['register-form']} onSubmit={handleSubmit(submit, error)}>
                <div className={styles['input-block']}>
                    <label htmlFor='email'>Ваш email</label>
                    <Input
                        className={cn({
                            [styles['invalid-input']]: errors.email
                        })}
                        placeholder='Email'
                        id='email'
                        {...register('email', { required: true, validate: value => validateEmail(value) })} />
                    <div
                        className={styles['invalid-message']}
                        hidden={errors.email ? false : true}>
                        Должен содержать символ @ и заканчиваться определением корневой доменной зоны</div>
                </div>
                <div className={styles['input-block']}>
                    <label htmlFor='password'>Ваш пароль</label>
                    <Input
                        placeholder='Пароль'
                        id='password'
                        type='password'
                        {...register('password', { required: true, validate: value => validatePassword(value) })} />
                    <div
                        className={styles['invalid-message']}
                        hidden={errors.password ? false : true}>
                        Должен содержать от 10 символов латинского алфавита, заглавную букву и спецсимвол
                    </div>
                </div>
                <div className={styles['input-block']}>
                    <label htmlFor='name'>Ваше имя</label>
                    <Input
                        placeholder='Имя'
                        id='name'
                        type='text'
                        {...register('name', { required: true, minLength: 2 })} />
                    <div
                        className={styles['invalid-message']}
                        hidden={errors.name ? false : true}>
                        Длина должна составлять не менее 2 символов
                    </div>
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