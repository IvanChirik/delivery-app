import { HTMLAttributes, ReactNode } from 'react';

export interface IDroppableArea extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode,
}
