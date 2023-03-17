import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { BATCH_SIZE } from "../../constants";
import { RootState } from '../../app/store';
import MediasStateType from './types/MediasStateType';
import searchItunes from './services/searchService';

export const initialState: MediasStateType = {
    medias: { results: [], resultCount: 0 },
    status: 'idle',
    currentPage: 1,
    error: ''
};
export const fetchMedias = createAsyncThunk('medias/fetchMedias', async (searchTerm: any) => {
    const response: any = await searchItunes(searchTerm, 200);
    return response.data
});

const mediasSlice = createSlice({
    name: 'medias',
    initialState,
    reducers: {
        moveNext(state) {
            state.currentPage++;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchMedias.pending, (state, action) => {
                state.status = 'loading';
                state.currentPage = 1;
            })
            .addCase(fetchMedias.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.medias = action.payload;
            })
            .addCase(fetchMedias.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || '';
            });
    }
});

export const { moveNext } = mediasSlice.actions;
export default mediasSlice.reducer;

export const selectAllMedias = (state: RootState) => state.itunes?.medias?.results;

export const selectActivePageMedias = (state: RootState) => state.itunes?.medias?.results?.slice(0, state.itunes.currentPage * BATCH_SIZE);

export const hasMoreMediasToRender = (state: RootState) => (state.itunes.currentPage * BATCH_SIZE) < state.itunes?.medias?.resultCount;

