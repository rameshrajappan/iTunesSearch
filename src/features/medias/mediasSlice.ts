import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BATCH_SIZE } from "../../constants";
import { RootState } from '../../app/store';
// Define a type for the slice state
export interface MediaState {
    medias: any,
    status: string,
    currentPage: number,
    error: string
}
export const initialState: MediaState = {
    medias: [],
    status: 'idle',
    currentPage: 1,
    error: ''
};
export const fetchMedias = createAsyncThunk('medias/fetchMedias', async (searchTerm: any) => {
    const response: any = await axios.get(
        `https://itunes.apple.com/search`,
        {
            params: { term: searchTerm, limit: 200 }
        }
    );
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

export const selectAllMedias = (state: RootState) => state.medias?.medias?.results;

export const selectActivePageMedias = (state: RootState) => state.medias?.medias?.results?.slice(0, state.medias.currentPage * BATCH_SIZE);

export const hasMoreMediasToRender = (state: RootState) => (state.medias.currentPage * BATCH_SIZE) < state.medias?.medias?.resultCount;

