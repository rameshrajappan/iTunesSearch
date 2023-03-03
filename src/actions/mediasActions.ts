import axios from 'axios';
import { GET_MEDIAS, GET_MEDIAS_SUCCESS, GET_MEDIAS_FAILURE, GET_NEXT_BATCH, ADD_NEXT_BATCH } from "../constants";
// Create Redux action types
export const getMedias = () => ({
    type: GET_MEDIAS,
});

export const getMediasSuccess = (medias: any) => ({
    type: GET_MEDIAS_SUCCESS,
    payload: medias,
});

export const getMediasFailure = () => ({
    type: GET_MEDIAS_FAILURE,
});

export const getNextBatch = () => ({
    type: GET_NEXT_BATCH,
});

export const addNextBatch = () => ({
    type: ADD_NEXT_BATCH,
});


// Combine them all in an asynchronous thunk
export function fetchMedias(searchTerm: string) {
    return async (dispatch: any) => {
        dispatch(getMedias());

        try {
            const response: any = await axios.get(
                `https://itunes.apple.com/search`,
                {
                    params: { term: searchTerm, limit: 200 }
                }
            );
            const data = response.data;
            dispatch(getMediasSuccess(data));

        } catch (error) {
            dispatch(getMediasFailure());
        }
    }
}
