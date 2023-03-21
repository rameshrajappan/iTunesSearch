import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { BATCH_SIZE } from "../../constants";
import { RootState } from '../../app/store';
import SearchStateType from './types/SearchStateType';
import { getSearchData } from './services/searchService';

export const initialState: SearchStateType = {
    searchTerm: '',
    data: { results: [], resultCount: 0 },
    status: 'idle',
    pageNumber: 1,
    error: ''
};
export const fetchData = createAsyncThunk('search/fetchData', async (searchTerm: any) => {
    const response: any = await getSearchData(searchTerm, 200);
    return response.data
});

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        moveNext(state) {
            state.pageNumber++;
        },
        setSearchTerm(state, action) {
            state.searchTerm = action.payload;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchData.pending, (state) => {
                state.status = 'loading';
                state.pageNumber = 1;
            })
            .addCase(fetchData.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || '';
            });
    }
});

export const { moveNext, setSearchTerm } = searchSlice.actions;
export default searchSlice.reducer;

export const selectAllItems = (state: RootState) => state.search?.data?.results;

export const selectActivePageItems = (state: RootState) => state.search?.data?.results?.slice(0, state.search.pageNumber * BATCH_SIZE);

export const hasMoreItemsToRender = (state: RootState) => (state.search?.pageNumber * BATCH_SIZE) < state.search?.data?.resultCount;

