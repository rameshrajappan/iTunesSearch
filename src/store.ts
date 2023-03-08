import { configureStore } from "@reduxjs/toolkit";
import mediasReducer from './features/medias/mediasSlice';
export default configureStore({
    reducer: {
        medias: mediasReducer
    }
})