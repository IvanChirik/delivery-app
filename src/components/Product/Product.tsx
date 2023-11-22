import { Await, useLoaderData } from 'react-router-dom';
import styles from './Product.module.css';
import { IProduct } from '../../interfaces/product.interface';
import { Suspense } from 'react';
import Heading from '../Heading/Heading';
import Button from '../Button/Button';

const Product = () => {
    const data = useLoaderData() as { data: IProduct };
    return <Suspense fallback={<>Loading....</>}>
        <Await resolve={data.data} >
            {({ data }: { data: IProduct }) =>
                <div className={styles.product}>
                    <div className={styles['product-header']}>
                        <button className={styles['back-button']}>
                            <img src='/back-arrow.svg' alt='Иконка перхода на предыдущую страницу' />
                        </button>
                        <Heading className={styles.name}>{data.name}</Heading>
                        <Button className={styles['cart-button']}>
                            <img src='/white-cart-icon.svg' alt={'Иконка корзины'} />
                            <span>В корзину</span>
                        </Button>
                    </div>
                    <div className={styles['product-body']}>
                        <img className={styles.icon} src={data.image} alt={'Изображение блюда'} />
                        <div className={styles['product-info']}>
                            <div className={styles.price}>
                                <div className={styles['menu-name']}>Цена</div>
                                <div className={styles['price-value']}>{data.price}&nbsp;<span>₽</span></div>
                            </div>
                            <div className={styles.rating}>
                                <div className={styles['menu-name']}>Рейтинг</div>
                                <div className={styles['rating-value']}>
                                    {data.rating}&nbsp;
                                    <img src='/star-icon.svg' alt='Иконка рейтинга' />
                                </div>
                            </div>
                            <ul className={styles.list}>
                                Состав
                                {data.ingredients.map(i => <li className={styles['list-element']} key={i}>{i}</li>)}
                            </ul>
                        </div>
                    </div>
                </div>
            }
        </Await>
    </Suspense>;
};

export default Product;