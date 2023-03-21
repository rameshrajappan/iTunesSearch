import SearchItemType from './SearchItemType';
type SearchStateType = {
    data: { results: Array<SearchItemType>, resultCount: number },
    status: 'idle' | 'loading' | 'succeeded' | 'failed',
    currentPage: number,
    error: string
};
export default SearchStateType;