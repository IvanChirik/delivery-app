import { Link, useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import Heading from '../../components/Heading/Heading';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { login, userActions } from '../../store/user.state';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import cn from 'classnames';
import { validateEmail, validatePassword } from '../../helpers/valaidate';


interface ILoginFormData {
    email: string,
    password: string
}
const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<ILoginFormData>();
    const { token, loginErrorMessage } = useSelector((s: RootState) => s.user);
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         clearErrors();
    //     }, 3000);
    //     return () => clearTimeout(timer);
    // }, [errors, clearErrors]);
    useEffect(() => {
        if (token)
            navigate('/');
    }, [token, navigate]);
    const submit: SubmitHandler<ILoginFormData> = (data) => {
        dispatch(userActions.cleanLoginErrorMessage());
        dispatch(login({ email: data.email, password: data.password }));
    };
    const error: SubmitErrorHandler<ILoginFormData> = data => {
        console.log(data);
    };
    // const submitHandler = async (e: FormEvent) => {
    //     e.preventDefault();
    //     dispatch(userActions.cleanLoginErrorMessage());
    //     const target = e.target as typeof e.target & EventTarget;
    //     const { email, password } = target;
    //     await sendLogin(email.value, password.value);
    // };
    // const sendLogin = async (email: string, password: string) => {
    //     dispatch(login({ email, password }));
    // };
    return (
        <div className={styles.login}>
            <Heading>
                Вход
            </Heading>
            {loginErrorMessage && <div className={styles.error}>{loginErrorMessage}</div>}
            <form className={styles['login-form']} onSubmit={handleSubmit(submit, error)}>
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
                        hidden={errors.email ? false : true}>Проверьте правильность введённого email</div>
                </div>
                <div className={styles['input-block']}>
                    <label htmlFor='password'>Ваш пароль</label>
                    <Input
                        className={cn({
                            [styles['invalid-input']]: errors.password
                        })}
                        placeholder='Пароль'
                        id='password'
                        type='password'
                        {...register('password', { required: true, validate: value => validatePassword(value) })} />
                    <div
                        className={styles['invalid-message']}
                        hidden={errors.password ? false : true}>Проверьте правильность введённого пароля</div>
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