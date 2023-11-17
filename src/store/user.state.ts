import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loadState } from '../helpers/storage';
import axios, { AxiosError } from 'axios';
import { IAuthData } from '../interfaces/auth.interface';
import { PREFIX } from '../helpers/API';
import { IUserProfileData } from '../interfaces/user.interface';
import { RootState } from './store';

export const JWT_PERSISTENT_STATE = 'userData';
export type UserState = {
    token: string | null,
    loginErrorMessage?: string,
    registerErrorMessage?: string,
    userProfile?: IUserProfileData
}
export interface IUserPersistentState {
    token: string | null,
}

const userInitialState: UserState = {
    token: loadState<IUserPersistentState>(JWT_PERSISTENT_STATE)?.token ?? null
};
export const login = createAsyncThunk('user/login',
    async (params: { email: string, password: string }) => {
        try {
            const { data } = await axios.post<IAuthData>(`${PREFIX}/auth/login`, {
                email: params.email,
                password: params.password
            });
            return data;
        }
        catch (e) {
            if (e instanceof AxiosError)
                throw new Error(e.response?.data.message);
        }
    });
export const register = createAsyncThunk('user/register',
    async (params: { email: string, password: string, name: string }) => {
        try {
            const { data } = await axios.post<IAuthData>(`${PREFIX}/auth/register`, {
                email: params.email,
                password: params.password,
                name: params.name
            });
            return data;
        }
        catch (e) {
            if (e instanceof AxiosError)
                throw new Error(e.response?.data.message);
        }

    }
);
export const getUserProfile = createAsyncThunk<IUserProfileData, void, { state: RootState }>('user/profile',
    async (_, thunkAPI) => {
        const token = thunkAPI.getState().user.token;
        const { data } = await axios.get<IUserProfileData>(`${PREFIX}/user/profile`, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }
        );
        return data;
    });
const userSlice = createSlice({
    name: 'user',
    initialState: userInitialState,
    reducers: {
        removeToken: (state) => {
            state.token = null;
        },
        cleanLoginErrorMessage: (state) => {
            state.loginErrorMessage = undefined;
        },
        cleanRegisterErrorMessage: (state) => {
            state.registerErrorMessage = undefined;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            if (!action.payload)
                return;
            state.token = action.payload.access_token;
        });
        builder.addCase(login.rejected, (state, action) => {
            state.loginErrorMessage = action.error.message;
        });
        builder.addCase(getUserProfile.fulfilled, (state, action) => {
            state.userProfile = action.payload;
        });
        builder.addCase(register.fulfilled, (state, action) => {
            if (!action.payload)
                return;
            state.token = action.payload.access_token;
        });
        builder.addCase(register.rejected, (state, action) => {
            state.registerErrorMessage = action.error.message;
        });
    }
});

export const userActions = userSlice.actions;
export default userSlice.reducer;