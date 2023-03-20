import MediaItemType from './MediaItemType';
type MediasStateType = {
    medias: { results: Array<MediaItemType>, resultCount: number },
    status: 'idle' | 'loading' | 'succeeded' | 'failed',
    currentPage: number,
    error: string
};
export default MediasStateType;