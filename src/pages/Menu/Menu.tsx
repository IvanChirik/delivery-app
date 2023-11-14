import axios from 'axios';
import Heading from '../../components/Heading/Heading';
import ProductCard from '../../components/ProductCard/ProductCard';
import Search from '../../components/Search/Search';
import styles from './Menu.module.css';
import { PREFIX } from '../../helpers/API.ts';
import { IProduct } from '../../interfaces/product.interface.ts';
import { useEffect, useState } from 'react';


const Main = () => {
    const [products, setProducts] = useState<IProduct[]>();
    useEffect(() => {
        getMenu();
    }, []);
    const getMenu = async () => {
        try {
            const { data } = await axios.get<IProduct[]>(`${PREFIX}/products`);
            console.log(await axios.get<IProduct[]>(`${PREFIX}/products`));
            setProducts(data);
        }
        catch (e) {
            console.log(e);
            return;
        }
    };
    return (
        <>
            <div className={styles['menu-header']}>
                <Heading>Меню</Heading>
                <Search placeholder='Введите блюдо или состав' />
            </div>
            <div className={styles['content-menu']}>
                {products?.map(product => <ProductCard
                    key={product.id}
                    id={product.id}
                    price={product.price}
                    rating={product.rating}
                    img={product.image}
                    name={product.name}
                    description={product.ingredients.join(', ')} />)}
            </div>
        </>
    );
};

export default Main;