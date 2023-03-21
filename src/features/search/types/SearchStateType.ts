import SearchItemType from './SearchItemType';
type SearchStateType = {
    data: { results: Array<SearchItemType>, resultCount: number },
    searchTerm: string,
    status: 'idle' | 'loading' | 'succeeded' | 'failed',
    pageNumber: number,
    error: string
};
export default SearchStateType;