import { useSelector } from 'react-redux';
import Button from '../../components/Button/Button';
import Heading from '../../components/Heading/Heading';
import { RootState } from '../../store/store';
import styles from './Cart.module.css';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { IProduct } from '../../interfaces/product.interface';
import { PREFIX } from '../../helpers/API';
import CartItem from '../../components/CartItem/CartItem';

const DELIVERY_PRICE: number = 170;

const Cart = () => {
    const items = useSelector((s: RootState) => s.cart.cartItems);
    const [cartProducts, setCartProducts] = useState<IProduct[]>([]);
    const getItem = async (id: number) => {
        const { data } = await axios.get<IProduct>(`${PREFIX}/products/${id}`);
        return data;
    };
    const loadAllItems = useCallback(async () => {
        const res = await Promise.all(items.map(i => getItem(i.id)));
        setCartProducts(res);
    }, [items]);
    useEffect(() => {
        loadAllItems();
    }, [items, loadAllItems]);
    const priceOfAllItems = items.map(i => {
        const product = cartProducts.find(p => p.id === i.id);
        if (!product)
            return 0;
        return product.price * i.count;

    }).reduce((sum, item) => (sum + item), 0);
    return (
        <div className={styles.cart}>
            <Heading>Корзина</Heading>
            {items.length === 0 && <div>Ваша корзина пуста</div>}
            {items.length !== 0 && <div className={styles.list}>
                {items.map(i => {
                    const product = cartProducts.find(p => p.id === i.id);
                    if (!product) {
                        return;
                    }
                    return <CartItem
                        key={product.id}
                        id={product.id}
                        count={i.count}
                        image={product.image}
                        price={product.price}
                        name={product.name}
                    />;
                })}
            </div>}
            <div className={styles.promo}>
                <input className={styles.input} placeholder='Промокод' />
                <Button className={styles['promo-button']} >Применить</Button></div>
            <div>
                <div className={styles.calculate}>
                    <div>Стоимость товаров</div>
                    <div className={styles.itog}>{priceOfAllItems}&nbsp;<span>₽</span></div>
                </div>
                <div className={styles.calculate}>
                    <div>Доставка</div>
                    <div className={styles.itog}>{DELIVERY_PRICE}&nbsp;<span>₽</span></div>
                </div>
                <div className={styles.calculate}>
                    <div>Итог</div>
                    <div className={styles.itog}>{priceOfAllItems + DELIVERY_PRICE}&nbsp;<span>₽</span></div>
                </div>
            </div>
            <Button appearance='upper' className={styles['send-cart']}>Оформить</Button>
        </div>
    );
};

export default Cart;