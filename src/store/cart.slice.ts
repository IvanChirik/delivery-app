import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { loadState } from '../helpers/storage';

export const CART_PERSISTENT_STATE = 'cartData';
export interface ICartItem {
    id: number,
    count: number
}
export interface ICartState {
    cartItems: ICartItem[]
}
const initialCartState: ICartState = loadState<ICartState>(CART_PERSISTENT_STATE) ?? {
    cartItems: []
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState: initialCartState,
    reducers: {
        addItem: (state, action: PayloadAction<number>) => {
            const currentItem = state.cartItems.find(i => i.id === action.payload);
            if (!currentItem) {
                state.cartItems.push({ id: action.payload, count: 1 });
                return;
            }
            state.cartItems = state.cartItems.map(i => {
                if (i.id === action.payload)
                    return { id: i.id, count: i.count + 1 };
                return i;
            });
        },
        removeItem: (state, action: PayloadAction<number>) => {
            const currentItem = state.cartItems.find(i => i.id === action.payload);
            if (!currentItem)
                return;
            if (currentItem.count <= 1) {
                state.cartItems = state.cartItems.filter(i => i.id !== action.payload);
                return;
            }
            state.cartItems = state.cartItems.map((i) => {
                if (i.id === action.payload) {
                    return { id: i.id, count: i.count - 1 };
                }
                return i;
            });
        },
        deleteProduct: (state, action: PayloadAction<number>) => {
            if (!(state.cartItems.find(i => i.id === action.payload)))
                return;
            state.cartItems = state.cartItems.filter(i => i.id !== action.payload);
        }
    }
});

export default cartSlice.reducer;
export const cartActions = cartSlice.actions;