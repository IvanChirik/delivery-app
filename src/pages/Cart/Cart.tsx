import Button from '../../components/Button/Button';
import CartItemList from '../../components/CartItemList/CartItemsList';
import Heading from '../../components/Heading/Heading';
import styles from './Cart.module.css';


const Cart = () => {
    return (
        <div className={styles.cart}>
            <Heading>Корзина</Heading>
            <CartItemList />
            <div className={styles.promo}>
                <input className={styles.input} />
                <Button className={styles['promo-button']}>Применить</Button></div>
            <div>
                <div className={styles.calculate}>Стоимость товаров</div>
                <div className={styles.calculate}>Доставка</div>
                <div className={styles.calculate}>Итог</div>
            </div>
        </div>
    );
};

export default Cart;