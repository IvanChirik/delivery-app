import { Await, useLoaderData } from 'react-router-dom';
import styles from './Product.module.css';
import { IProduct } from '../../interfaces/product.interface';
import { Suspense } from 'react';

const Product = () => {
    const data = useLoaderData() as { data: IProduct };
    return <Suspense fallback={<>Loading....</>}>
        <Await resolve={data.data} >
            {({ data }: { data: IProduct }) =>
                <div className={styles.product}>Product - {data.name}</div>
            }
        </Await>
    </Suspense>;
};

export default Product;