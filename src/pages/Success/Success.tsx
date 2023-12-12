import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import styles from './Success.module.css';
import { ISuccess } from './Success.props';
import cn from 'classnames';

const Success = ({ className, ...props }: ISuccess) => {
    const navigate = useNavigate();
    const returnToMenuPage = () => {
        navigate('/');
    };
    return (
        <div className={cn(styles.wrapper, className)} {...props}>
            <div className={styles.image}>
                <img src='./cart-success.png' alt='Изображение пиццы' />
            </div>
            <div className={styles.description}>
                Ваш заказ успешно оформлен!
            </div>
            <Button
                className={styles.button}
                appearance='upper'
                onClick={returnToMenuPage}>Сделать новый</Button>
        </div>
    );
};

export default Success;