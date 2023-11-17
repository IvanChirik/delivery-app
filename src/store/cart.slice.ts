import { PayloadAction, createSlice } from '@reduxjs/toolkit';


export interface ICartItem {
    id: number,
    count: number
}
export interface ICartState {
    cartItems: ICartItem[]
}
const initialCartState: ICartState = {
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
        }
    }
});

export default cartSlice.reducer;
export const cartActions = cartSlice.actions;