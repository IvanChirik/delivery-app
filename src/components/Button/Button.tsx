import { ButtonProps } from './Button.props.ts';
import styles from './Button.module.css';
import cn from 'classnames';


const Button = ({ children, appearance = 'regular', className, ...props }: ButtonProps) => {
    return (
        <button className={cn(className, styles.button, {
            [styles.upper]: appearance === 'upper',
            [styles.regular]: appearance === 'regular'
        })}{...props}>
            {children}
        </button>
    );
};

export default Button;