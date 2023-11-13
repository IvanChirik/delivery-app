import styles from './Input.module.css';
import cn from 'classnames';
import { forwardRef } from 'react';
import { InputProps } from '../Input/Input.props';

const Input = forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
    return <input ref={ref} className={cn(className, styles.input)} {...props} />;
});

export default Input;