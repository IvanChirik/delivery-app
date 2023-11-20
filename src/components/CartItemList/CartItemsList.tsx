import styles from './CartItemsList.module.css';
import CartItem from '../CartItem/CartItem';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';
import { IProduct } from '../../interfaces/product.interface';
import { PREFIX } from '../../helpers/API';
import axios from 'axios';

const CartItemList = () => {
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
    return (
        <div className={styles.list}>
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
        </div>
    );
};

export default CartItemList;