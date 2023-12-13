import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/Button/Button';
import Heading from '../../components/Heading/Heading';
import { AppDispatch, RootState } from '../../store/store';
import styles from './Cart.module.css';
import { useCallback, useEffect, useState } from 'react';
import { IProduct } from '../../interfaces/product.interface';
import CartItem from '../../components/CartItem/CartItem';
import { IOrder } from '../../interfaces/order.interface';
import { $api } from '../../http';
import { cartActions, clearCart } from '../../store/cart.slice';
import { useNavigate } from 'react-router-dom';

const DELIVERY_PRICE: number = 170;

const Cart = () => {
    const items = useSelector((s: RootState) => s.cart.cartItems);
    const totalPrice = useSelector((s: RootState) => s.cart.totalPrice);
    const dispatch = useDispatch<AppDispatch>();
    const [cartProducts, setCartProducts] = useState<IProduct[]>([]);
    const navigate = useNavigate();
    const [error, setError] = useState<string | undefined>();
    const getItem = async (id: string) => {
        const { data } = await $api.get<IProduct>(`/products/${id}`);
        return data;
    };
    const loadAllItems = useCallback(async () => {
        const res = await Promise.all(items.map(i => getItem(i.productId)));
        setCartProducts(res);
    }, [items]);
    const getCart = useCallback(async () => {
        const { data } = await $api.get('/cart');
        dispatch(cartActions.getCart(data));
    }, [dispatch]);
    useEffect(() => {
        getCart();
    }, [getCart]);
    useEffect(() => {
        loadAllItems();
    }, [items, loadAllItems]);
    const checkout = async () => {
        try {
            setError(undefined);
            const { data } = await $api.get<IOrder>('/order');
            dispatch(clearCart());
            navigate('/success');
            return data;
        }
        catch (e) {
            if (e instanceof Error) {
                setError(e.message);
            }
        }

    };
    return (
        <div className={styles.cart}>
            <Heading>Корзина</Heading>
            {error && <div className={styles.error}>{error}</div>}
            {items.length === 0 && <div className={styles['empty-cart']}>Ваша корзина пуста</div>}
            {items.length !== 0 && <div className={styles.list}>
                {items.map(i => {
                    const product = cartProducts.find(p => p._id === i.productId);
                    if (!product) {
                        return;
                    }
                    return <CartItem
                        key={product._id}
                        id={product._id}
                        count={i.quantity}
                        image={product.image}
                        price={product.price}
                        name={product.name}
                    />;
                })}
            </div>
            }
            <div className={styles.promo}>
                <input className={styles.input} placeholder='Промокод' />
                <Button className={styles['promo-button']} >Применить</Button>
            </div>
            <div className={styles.footer}>
                <div className={styles.calculate}>
                    <div>Стоимость товаров</div>
                    <div className={styles.itog}>{totalPrice}&nbsp;<span>₽</span></div>
                </div>
                <div className={styles.calculate}>
                    <div>Доставка</div>
                    <div className={styles.itog}>{totalPrice ? DELIVERY_PRICE : 0}&nbsp;<span>₽</span></div>
                </div>
                <div className={styles.calculate}>
                    <div>Итог&nbsp;<span>({items.length})</span></div>
                    <div className={styles.itog}>{totalPrice ? totalPrice + DELIVERY_PRICE : 0}&nbsp;<span>₽</span></div>
                </div>
            </div>
            <Button
                appearance='upper'
                className={styles['send-cart']}
                disabled={!items.length}
                onClick={checkout}>Оформить</Button>
        </div>
    );
};

export default Cart;

