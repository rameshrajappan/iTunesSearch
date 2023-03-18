import {
    combineReducers,
    configureStore
} from '@reduxjs/toolkit';
import type { PreloadedState } from '@reduxjs/toolkit';
import mediasReducer from '../features/medias/mediasSlice';
// Create the root reducer independently to obtain the RootState type
const rootReducer = combineReducers({
    itunes: mediasReducer
});
export function setupStore(preloadedState?: PreloadedState<RootState>) {
    return configureStore({
        reducer: rootReducer,
        preloadedState
    })
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];