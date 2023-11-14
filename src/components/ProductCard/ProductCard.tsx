import { Link } from 'react-router-dom';
import styles from './ProductCard.module.css';
import { ProductCard } from './ProductCard.props';

const ProductCard = (props: ProductCard) => {
    const { id, price, rating, img, name, description } = props;
    return (
        <div className={styles.card}>
            <Link to={`/product/${id}`} className={styles.link}>
                <div className={styles.head} style={{ backgroundImage: `url(${img})` }}>
                    <div className={styles.price}>
                        {price}&nbsp;
                        <span className={styles.currency}>₽</span>
                    </div>
                    <button className={styles['cart-icon']}>
                        <img src='./cart-delivery-icon.svg' alt='Иконка добаления в корзину' />
                    </button>
                    <div className={styles.rating}>
                        {rating}&nbsp;
                        <img src='./star-icon.svg' alt='Иконка рейтинга' />
                    </div>
                </div>
                <div className={styles.footer}>
                    <div className={styles.title}>{name}</div>
                    <div className={styles.description}>{description}</div>
                </div>
            </Link>
        </div>
    );
};

export default ProductCard;