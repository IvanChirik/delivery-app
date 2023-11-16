import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { loadState } from '../helpers/storage';

export const JWT_PERSISTENT_STATE = 'userData';
export type UserState = {
    token: string | null
}
export interface IUserPersistentState {
    token: string | null
}

const userInitialState: UserState = {
    token: loadState<IUserPersistentState>(JWT_PERSISTENT_STATE)?.token ?? null
};

const userSlice = createSlice({
    name: 'user',
    initialState: userInitialState,
    reducers: {
        addToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
        },
        removeToken: (state) => {
            state.token = null;
        }
    }
});

export const userActions = userSlice.actions;
export default userSlice.reducer;