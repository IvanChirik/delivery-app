import { DropTargetMonitor, useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../store/cart.slice';
import { IProduct } from '../../interfaces/product.interface';
import { Dnd } from '../../helpers/dragAndDrop';
import { IDroppableArea } from './DroppableArea.props';
import styles from './DroppableArea.module.css';
import cn from 'classnames';
import { FunctionComponent } from 'react';

export const DroppableArea: FunctionComponent<IDroppableArea> = ({ children }) => {
    const dispatch = useDispatch();
    const [{ canDrop, isOver }, drop] = useDrop({
        accept: Dnd.cartDragAndDrop,
        drop: (product: IProduct) => dispatch(cartActions.addItem(product._id)),
        collect: (monitor: DropTargetMonitor) => ({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop()
        })
    });
    const isActive = canDrop && isOver;
    return (
        <div ref={drop} className={cn(isActive ? styles.active : '')}>
            {children}
        </div>
    );
};

// const WithDrop = <T extends Record<string, unknown>>(Component: FunctionComponent<T>) => {
//     return WithDropComponent (props: T): JSX.Element => {
//         return (
//             <DroppableArea>
//                 <Component {...props} />
//             </DroppableArea>
//         );
//     };
// };