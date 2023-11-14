import axios, { AxiosError } from 'axios';
import Heading from '../../components/Heading/Heading';
import ProductCard from '../../components/ProductCard/ProductCard';
import Search from '../../components/Search/Search';
import styles from './Menu.module.css';
import { PREFIX } from '../../helpers/API.ts';
import { IProduct } from '../../interfaces/product.interface.ts';
import { useEffect, useState } from 'react';
import cn from 'classnames';


const Main = () => {
    const [products, setProducts] = useState<IProduct[]>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined>();
    useEffect(() => {
        getMenu();
    }, []);
    const getMenu = async () => {
        try {
            setIsLoading(true);
            await new Promise<void>((resolve) =>
                setTimeout(() => {
                    resolve();
                }, 2000)
            );
            const { data } = await axios.get<IProduct[]>(`${PREFIX}/products`);
            console.log(await axios.get<IProduct[]>(`${PREFIX}/products`));
            setProducts(data);
            setError(undefined);

            setIsLoading(false);
        }
        catch (e) {
            if (e instanceof AxiosError)
                setError(e.message);
            setIsLoading(false);
            return;
        }
    };
    return (
        <>
            <div></div>
            <div className={styles['menu-header']}>
                <Heading>Меню</Heading>
                <Search placeholder='Введите блюдо или состав' />
            </div>
            <div className={cn(styles['content-menu'], {
                [styles.loading]: isLoading
            })}>
                {error && <p>{error}</p>}
                {!isLoading && products?.map(product => <ProductCard
                    key={product.id}
                    id={product.id}
                    price={product.price}
                    rating={product.rating}
                    img={product.image}
                    name={product.name}
                    description={product.ingredients.join(', ')} />)}
                {isLoading && <div className={styles.loader}></div>}
            </div>
        </>
    );
};

export default Main;