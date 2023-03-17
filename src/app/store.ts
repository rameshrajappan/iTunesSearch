import { configureStore } from '@reduxjs/toolkit';
import mediasReducer from '../features/medias/mediasSlice';

const store = configureStore({
    reducer: {
        itunes: mediasReducer
    }
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;