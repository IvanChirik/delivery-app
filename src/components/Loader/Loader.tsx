import styles from './Loader.module.css';
import cn from 'classnames';
import { LoaderProps } from './Loader.props';

const Loader = ({ className, ...props }: LoaderProps) => {
    return (
        <div className={cn(styles.loader, className)} {...props}>
        </div>
    );
};

export default Loader;