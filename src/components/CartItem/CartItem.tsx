import { useDispatch } from 'react-redux';
import styles from './CartItem.module.css';
import { ICartItem } from './CartItem.props';
import cn from 'classnames';
import { cartActions } from '../../store/cart.slice';

const CartItem = ({ ...props }: ICartItem) => {
    const dispatch = useDispatch();
    const { id, image, count, price, name } = props;
    const addItem = () => {
        dispatch(cartActions.addItem(id));
    };
    const removeItem = () => {
        dispatch(cartActions.removeItem(id));
    };
    const deleteProductFromCart = () => {
        dispatch(cartActions.deleteProduct(id));
    };
    return (
        <div className={styles['cart-item']}>
            <div className={styles.image} style={{ backgroundImage: `url(${image})` }}></div>
            <div className={styles.description}>
                <div className={styles.title}>{name}</div>
                <div className={styles.price}>
                    {`${price} ₽`}
                </div>
            </div>
            <div className={styles['count-panel']}>
                <button className={cn(styles['action-button'], styles.minus)} onClick={removeItem}>
                    <img src={'./minus-icon.svg'} alt={'Иконка удаления товара из корзины'} />
                </button>
                <div className={styles.amount}>
                    <div>{count}</div>
                </div>
                <button className={cn(styles['action-button'], styles.plus)}>
                    <img src={'./plus-icon.svg'} alt={'Иконка добавления товара в корзину'} onClick={addItem} />
                </button>
                <button className={styles['action-button']} onClick={deleteProductFromCart}>
                    <img src={'./close-icon.svg'} alt={'Иконка удаления товара из корзины'} />
                </button>
            </div>
        </div >
    );
};

export default CartItem;