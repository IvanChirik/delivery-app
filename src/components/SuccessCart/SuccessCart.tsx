import { useNavigate } from 'react-router-dom';
import Button from '../Button/Button';
import styles from './SuccessCart.module.css';
import { ICartSuccess } from './SuccessCart.props';
import cn from 'classnames';

const SuccessCart = ({ className, ...props }: ICartSuccess) => {
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

export default SuccessCart;