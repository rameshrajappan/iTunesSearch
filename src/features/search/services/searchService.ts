import axios from 'axios';
export const getSearchData = async (searchTerm: string, loadCount: number) => {
    return await axios.get(
        `https://itunes.apple.com/search`,
        {
            params: { term: searchTerm, limit: loadCount }
        });
}