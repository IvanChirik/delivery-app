import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loadState } from '../helpers/storage';
import { ICartApi, ICartProduct } from '../interfaces/cart.intrface';
import axios, { AxiosError } from 'axios';
import { API_URL } from '../helpers/API';

export const CART_PERSISTENT_STATE = 'cartData';
export interface ICartState {
    cartItems: ICartProduct[]
}
const initialCartState: ICartState = loadState<ICartState>(CART_PERSISTENT_STATE) ?? {
    cartItems: []
};
export const setCart = createAsyncThunk('cart/setCart',
    async () => {
        try {
            const { data } = await axios.get<ICartApi>(`${API_URL}/cart`, { withCredentials: true });
            return data;
        } catch (error) {
            if (error instanceof AxiosError)
                throw new Error(error.response?.data.message);
        }

    });
export const addCartItem = createAsyncThunk('cart/addItem',
    async (params: { productId: string }) => {
        try {
            const { data } = await axios.post<ICartApi>(`${API_URL}/cart/add`, { id: params.productId }, { withCredentials: true });
            return data;
        } catch (error) {
            if (error instanceof AxiosError)
                throw new Error(error.response?.data.message);
        }

    });
export const removeCartItem = createAsyncThunk('cart/removeItem',
    async (params: { productId: string }) => {
        try {
            const { data } = await axios.post<ICartApi>(`${API_URL}/cart/remove`, { id: params.productId }, { withCredentials: true });
            return data;
        } catch (error) {
            if (error instanceof AxiosError)
                throw new Error(error.response?.data.message);
        }

    });
export const clearCart = createAsyncThunk('cart/clearCart',
    async () => {
        try {
            const { data } = await axios.get<ICartApi>(`${API_URL}/cart/clear`, { withCredentials: true });
            return data;
        } catch (error) {
            if (error instanceof AxiosError)
                throw new Error(error.response?.data.message);
        }
    });
export const cartSlice = createSlice({
    name: 'cart',
    initialState: initialCartState,
    reducers: {
        // addItem: (state, action: PayloadAction<number>) => {
        //     const currentItem = state.cartItems.find(i => i.id === action.payload);
        //     if (!currentItem) {
        //         state.cartItems.push({ id: action.payload, count: 1 });
        //         return;
        //     }
        //     state.cartItems = state.cartItems.map(i => {
        //         if (i.id === action.payload)
        //             return { id: i.id, count: i.count + 1 };
        //         return i;
        //     });
        // },
        // removeItem: (state, action: PayloadAction<number>) => {
        //     const currentItem = state.cartItems.find(i => i.id === action.payload);
        //     if (!currentItem)
        //         return;
        //     if (currentItem.count <= 1) {
        //         state.cartItems = state.cartItems.filter(i => i.id !== action.payload);
        //         return;
        //     }
        //     state.cartItems = state.cartItems.map((i) => {
        //         if (i.id === action.payload) {
        //             return { id: i.id, count: i.count - 1 };
        //         }
        //         return i;
        //     });
        // },
        deleteProduct: (state, action: PayloadAction<string>) => {
            if (!(state.cartItems.find(i => i.productId === action.payload)))
                return;
            state.cartItems = state.cartItems.filter(i => i.productId !== action.payload);
        }
        // clear: (state) => {
        //     state.cartItems = [];
        // }
    },
    extraReducers: (builder) => {
        builder.addCase(setCart.fulfilled, (state, action) => {
            if (!action.payload)
                return;
            state.cartItems = action.payload.products;
        });
        builder.addCase(setCart.rejected, (_, action) => {
            console.log(action.error.message);
        });
        builder.addCase(addCartItem.fulfilled, (state, action) => {
            if (!action.payload)
                return;
            state.cartItems = action.payload.products;
        });
        builder.addCase(addCartItem.rejected, (_, action) => {
            console.log(action.error.message);
        });
        builder.addCase(removeCartItem.fulfilled, (state, action) => {
            if (!action.payload)
                return;
            state.cartItems = action.payload.products;
        });
        builder.addCase(removeCartItem.rejected, (_, action) => {
            console.log(action.error.message);
        });
        builder.addCase(clearCart.fulfilled, (state, action) => {
            if (!action.payload)
                return;
            state.cartItems = action.payload.products;
        });
        builder.addCase(clearCart.rejected, (_, action) => {
            console.log(action.error.message);
        });
    }
});

export default cartSlice.reducer;
export const cartActions = cartSlice.actions;