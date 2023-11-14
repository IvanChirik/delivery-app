import { useLoaderData } from 'react-router-dom';
import styles from './Product.module.css';
import { IProduct } from '../../interfaces/product.interface';

const Product = () => {
    const data = useLoaderData() as IProduct;
    return (
        <div className={styles.product}>
            Product - {data.name}
        </div>
    );
};

export default Product;