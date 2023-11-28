import { ReactNode } from 'react';
import { DragLayerMonitor, useDrag } from 'react-dnd';

const DraggableItem = ({ id, children }: { id: number, children: ReactNode }) => {
    const [{ isDragging }, drag] = useDrag({
        type: 'ITEM', // Тип элемента для идентификации в процессе перетаскивания
        item: { id },
        collect: (monitor: DragLayerMonitor) => ({
            isDragging: !!monitor.isDragging()
        })
    });
    return (
        <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
            {children}
        </div>
    );
};

export default DraggableItem;
