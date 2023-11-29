import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import styles from './MenuLayout.module.css';
import Button from '../../components/Button/Button';
import cn from 'classnames';
import { AppDispatch, RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../store/user.state';
import { DroppableArea } from '../../components/DroppableItem/DroppableArea';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';


const MenuLayout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const profileData = useSelector((s: RootState) => s.user.userProfile);
    const cartItems = useSelector((s: RootState) => s.cart.cartItems);
    const onLogout = () => {
        dispatch(userActions.removeToken());
        navigate('/auth/login');
    };
    return (
        <DndProvider backend={HTML5Backend}>
            <div className={styles.layout}>
                <div className={styles.sidebar}>
                    <div className={styles.user}>
                        <img src='../../../public/user-icon.png' alt='Иконка пользователя' />
                        <div className={styles.name}>{profileData?.name}</div>
                        <div className={styles.email}>{profileData?.email}</div>
                    </div>
                    <div className={styles.menu}>
                        <NavLink to='/' className={({ isActive }) => cn(styles.link, {
                            [styles.active]: isActive
                        })}>
                            <img src='../../../public//menu-icon.svg' alt='Иконка меню' />
                            Главная
                        </NavLink>
                        <DroppableArea>
                            <NavLink to='/cart' className={({ isActive }) => cn(styles.link, {
                                [styles.active]: isActive
                            })}>
                                <img src='../../../public//cart-icon.svg' alt='Иконка корзины' />
                                Корзина
                                <div className={styles['cart-counter']}>{cartItems?.reduce((sum, item) => sum + item.count, 0)}</div>
                            </NavLink>
                        </DroppableArea>
                    </div>
                    <Button className={styles.exit} onClick={onLogout}>
                        <img src='../../../public//exit-icon.svg' alt='Иконка выхода' />
                        Выход</Button>
                </div>
                <div className={styles.content}>
                    <Outlet />
                </div>
            </div >
        </DndProvider >
    );
};

export default MenuLayout;