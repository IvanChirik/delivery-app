import { useDrag } from 'react-dnd';
import { Dnd } from '../../helpers/dragAndDrop';
import { IDraggableItem } from './DraggableItem.props';
import styles from './DraggableItem.module.css';
import cn from 'classnames';


const DraggableItem = ({ product, children }: IDraggableItem) => {
    const [{ isDragging }, drag] = useDrag({
        type: Dnd.cartDragAndDrop,
        item: { ...product },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    });
    return (
        <div ref={drag} className={cn({
            [styles.draggable]: isDragging
        })}>
            {children}
        </div>
    );
};

export default DraggableItem;
