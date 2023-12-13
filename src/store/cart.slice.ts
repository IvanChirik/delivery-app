import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ICartApi, ICartProduct } from '../interfaces/cart.intrface';
import axios, { AxiosError } from 'axios';
import { API_URL } from '../helpers/API';
import { loadState } from '../helpers/storage';
import { IUserPersistentState, JWT_PERSISTENT_STATE } from './user.state';

export const CART_PERSISTENT_STATE = 'cartData';
export interface ICartState {
    cartItems: ICartProduct[],
    total: number,
    totalPrice: number,

}
const initialCartState: ICartState = {
    cartItems: [],
    total: 0,
    totalPrice: 0
};
const setHeaders = () => {
    const token = loadState<IUserPersistentState>(JWT_PERSISTENT_STATE)?.token;
    if (token)
        return {
            withCredentials: true, headers: {
                Authorization: 'Bearer ' + token
            }
        };
};
export const setCart = createAsyncThunk('cart/setCart',
    async () => {
        try {
            const { data } = await axios.get<ICartApi>(`${API_URL}/cart`, setHeaders());
            return data;
        } catch (error) {
            if (error instanceof AxiosError)
                throw new Error(error.response?.data.message);
        }

    });
export const addCartItem = createAsyncThunk('cart/addItem',
    async (params: { productId: string }) => {
        try {
            const { data } = await axios.post<ICartApi>(`${API_URL}/cart/add`, { id: params.productId }, setHeaders());
            return data;
        } catch (error) {
            if (error instanceof AxiosError)
                throw new Error(error.response?.data.message);
        }

    });
export const removeCartItem = createAsyncThunk('cart/removeItem',
    async (params: { productId: string }) => {
        try {
            const { data } = await axios.post<ICartApi>(`${API_URL}/cart/remove`, { id: params.productId }, setHeaders());
            return data;
        } catch (error) {
            if (error instanceof AxiosError)
                throw new Error(error.response?.data.message);
        }

    });
export const deleteProduct = createAsyncThunk('cart/deleteProduct',
    async (params: { productId: string }) => {
        try {
            const { data } = await axios.post<ICartApi>(`${API_URL}/cart/delete-product`, { id: params.productId }, setHeaders());
            return data;
        } catch (error) {
            if (error instanceof AxiosError)
                throw new Error(error.response?.data.message);
        }

    });
export const clearCart = createAsyncThunk('cart/clearCart',
    async () => {
        try {
            const { data } = await axios.get<ICartApi>(`${API_URL}/cart/clear`, setHeaders());
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
        getCart: (state, action: PayloadAction<ICartApi>) => {
            state.cartItems = action.payload.products;
            state.total = action.payload.total;
            state.totalPrice = action.payload.totalPrice;
        },
        clearLocalCart: (state) => {
            state.cartItems = [];
            state.total = 0;
            state.totalPrice = 0;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(setCart.fulfilled, (state, action) => {
            if (!action.payload)
                return;
            state.cartItems = action.payload.products;
            state.total = action.payload.total;
            state.totalPrice = action.payload.totalPrice;
        });
        builder.addCase(setCart.rejected, (_, action) => {
            console.log(action.error.message);
        });
        builder.addCase(addCartItem.fulfilled, (state, action) => {
            if (!action.payload)
                return;
            state.cartItems = action.payload.products;
            state.total = action.payload.total;
            state.totalPrice = action.payload.totalPrice;
        });
        builder.addCase(addCartItem.rejected, (_, action) => {
            console.log(action.error.message);
        });
        builder.addCase(removeCartItem.fulfilled, (state, action) => {
            if (!action.payload)
                return;
            state.cartItems = action.payload.products;
            state.total = action.payload.total;
            state.totalPrice = action.payload.totalPrice;
        });
        builder.addCase(removeCartItem.rejected, (_, action) => {
            console.log(action.error.message);
        });
        builder.addCase(deleteProduct.fulfilled, (state, action) => {
            if (!action.payload)
                return;
            state.cartItems = action.payload.products;
            state.total = action.payload.total;
            state.totalPrice = action.payload.totalPrice;
        });
        builder.addCase(deleteProduct.rejected, (_, action) => {
            console.log(action.error.message);
        });
        builder.addCase(clearCart.fulfilled, (state, action) => {
            if (!action.payload)
                return;
            state.cartItems = action.payload.products;
            state.total = action.payload.total;
            state.totalPrice = action.payload.totalPrice;
        });
        builder.addCase(clearCart.rejected, (_, action) => {
            console.log(action.error.message);
        });
    }
});

export default cartSlice.reducer;
export const cartActions = cartSlice.actions;