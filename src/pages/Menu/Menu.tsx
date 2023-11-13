import Heading from '../../components/Heading/Heading';
import Search from '../../components/Search/Search';
import styles from './Menu.module.css';


const Main = () => {
    return (
        <>
            <div className={styles.menu}>
                <Heading>Меню</Heading>
                <Search placeholder='Введите блюдо или состав' />
            </div>
        </>
    );
};

export default Main;