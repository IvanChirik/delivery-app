import { useDispatch } from 'react-redux';
import styles from './CartItem.module.css';
import { ICartItem } from './CartItem.props';
import cn from 'classnames';
import { addCartItem, cartActions, removeCartItem } from '../../store/cart.slice';
import { AppDispatch } from '../../store/store';

const CartItem = ({ ...props }: ICartItem) => {
    const dispatch = useDispatch<AppDispatch>();
    const { id, image, count, price, name } = props;
    const addItem = () => {
        dispatch(addCartItem({ productId: id }));
    };
    const removeItem = () => {
        dispatch(removeCartItem({ productId: id }));
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
                <button className={cn(styles['action-button'], styles.plus)} >
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