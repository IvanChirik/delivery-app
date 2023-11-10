import styles from './Input.module.css';
import cn from 'classnames';
import { InputProps } from './Input.props';
import { forwardRef } from 'react';

const Input = forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
    return <input ref={ref} className={cn(className, styles.input)} {...props} />;
});

export default Input;