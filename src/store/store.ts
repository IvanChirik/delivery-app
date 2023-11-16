import { configureStore } from '@reduxjs/toolkit';
import userSlice, { JWT_PERSISTENT_STATE } from './user.state.ts';
import { saveState } from '../helpers/storage.ts';


export const store = configureStore({
    reducer: {
        user: userSlice
    }
});
store.subscribe(() => {
    saveState({ token: store.getState().user.token }, JWT_PERSISTENT_STATE);
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;