import { ReactNode } from 'react';
import { DropTargetMonitor, useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../store/cart.slice';
import { IProduct } from '../../interfaces/product.interface';

const DroppableArea = ({ children }: { children: ReactNode }) => {
    const dispatch = useDispatch();
    const [{ canDrop, isOver }, drop] = useDrop({
        accept: 'ITEM', // Тип элемента, который может быть сброшен на эту область
        drop: (product: IProduct) => dispatch(cartActions.addItem(product.id)),
        collect: (monitor: DropTargetMonitor) => ({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop()
        })
    });

    const isActive = canDrop && isOver;
    return (
        <div ref={drop} style={{ border: isActive ? '1px solid #000' : 'none', borderRadius: '100px' }}>
            {children}
        </div>
    );
};

export default DroppableArea;