import { HTMLAttributes, ReactNode } from 'react';
import { IProduct } from '../../interfaces/product.interface';

export interface IDraggableItem extends HTMLAttributes<HTMLDivElement> {
    product: IProduct
    children: ReactNode
}