import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/Button/Button';
import Heading from '../../components/Heading/Heading';
import { AppDispatch, RootState } from '../../store/store';
import styles from './Cart.module.css';
import { useCallback, useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { IProduct } from '../../interfaces/product.interface';
import { PREFIX } from '../../helpers/API';
import CartItem from '../../components/CartItem/CartItem';
import SuccessCart from '../../components/SuccessCart/SuccessCart';
import { IOrder } from '../../interfaces/order.interface';
import { $api } from '../../http';
import { cartActions, clearCart } from '../../store/cart.slice';

const DELIVERY_PRICE: number = 170;

const Cart = () => {
    const items = useSelector((s: RootState) => s.cart.cartItems);
    const totalPrice = useSelector((s: RootState) => s.cart.totalPrice);
    const token = useSelector((s: RootState) => s.user.token);
    const dispatch = useDispatch<AppDispatch>();
    const [cartProducts, setCartProducts] = useState<IProduct[]>([]);
    const [order, setOrder] = useState<boolean>(false);
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
    const priceOfAllItems = items.map(i => {
        const product = cartProducts.find(p => p._id === i.productId);
        if (!product)
            return 0;
        return product.price * i.quantity;

    }).reduce((sum, item) => (sum + item), 0);
    const checkout = async () => {
        try {
            setError(undefined);
            const { data } = await axios.post<IOrder>(`${PREFIX}/order`, {
                total: priceOfAllItems + DELIVERY_PRICE,
                products: items.map(i => {
                    const product = cartProducts.find(p => p._id === i.productId);
                    if (!product)
                        return;
                    return {
                        id: i.productId,
                        count: i.quantity,
                        price: product.price
                    };
                })
            }, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            });
            setOrder(true);
            dispatch(clearCart());
            return data;
        }
        catch (e) {
            if (e instanceof AxiosError) {
                setError(e.message);
            }
        }

    };
    return (
        <>
            {order && <SuccessCart />}
            {!order && <div className={styles.cart}>
                <Heading>Корзина</Heading>
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
                </div>}
                <div className={styles.promo}>
                    <input className={styles.input} placeholder='Промокод' />
                    <Button className={styles['promo-button']} >Применить</Button></div>
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
            }
            {error && <div>{error}</div>}
        </>
    );
};

export default Cart;

