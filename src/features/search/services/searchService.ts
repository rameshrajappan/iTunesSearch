import axios from 'axios';
const searchItunes = async (searchTerm: string, loadCount: number) => {
    return await axios.get(
        `https://itunes.apple.com/search`,
        {
            params: { term: searchTerm, limit: loadCount }
        });
}
export default searchItunes; 