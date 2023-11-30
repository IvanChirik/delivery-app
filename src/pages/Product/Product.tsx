import { Await, useLoaderData, useNavigate } from 'react-router-dom';
import styles from './Product.module.css';
import { IProduct } from '../../interfaces/product.interface';
import { Suspense } from 'react';
import Heading from '../../components/Heading/Heading';
import Button from '../../components/Button/Button';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { cartActions } from '../../store/cart.slice';
import Loader from '../../components/Loader/Loader';

const Product = () => {
    const data = useLoaderData() as { data: IProduct };
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const toBack = () => {
        navigate('/', { replace: true });
    };
    return <Suspense fallback={<div className={styles.loader}><Loader /></div>}>
        <Await resolve={data.data} >
            {({ data }: { data: IProduct }) =>
                <div className={styles.product}>
                    <div className={styles['product-header']}>
                        <button className={styles['back-button']} onClick={toBack}>
                            <img src='/back-arrow.svg' alt='Иконка перхода на предыдущую страницу' />
                        </button>
                        <Heading className={styles.name}>{data.name}</Heading>
                        <Button className={styles['cart-button']} onClick={() => {
                            dispatch(cartActions.addItem(data._id));
                        }}>
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
                            <div>
                                <div className={styles.composition}><span>Состав:</span></div>
                                <ul className={styles.list}>
                                    {data.ingredients.map(i => <li className={styles['list-element']} key={i}>{i[0].toUpperCase() + i.slice(1)}</li>)}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </Await>
    </Suspense>;
};

export default Product;