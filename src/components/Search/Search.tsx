import styles from './Search.module.css';
import cn from 'classnames';
import { SearchProps } from './Search.props';
import { forwardRef } from 'react';

const Search = forwardRef<HTMLInputElement, SearchProps>(({ className, ...props }, ref) => {
    return <div className={styles['search-wrapper']}>
        <input ref={ref} className={cn(className, styles.input)} {...props} />
        <img className={styles['search-icon']} src='./search-icon.svg' alt='Иконка поиска' />
    </div>;

});

export default Search;