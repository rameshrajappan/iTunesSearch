import { GET_MEDIAS, GET_MEDIAS_SUCCESS, GET_MEDIAS_FAILURE, BATCH_SIZE, GET_NEXT_BATCH, ADD_NEXT_BATCH } from "../constants";
export const initialState = {
    medias: [],
    loading: false,
    loaded:false,
    hasErrors: false,
    allMedias: [],
    nextBatch: [],
    currentPage: 1,
    isEndOfCatalogue: false,
    totalResultCount: 0,
}
export function checkEndOfCatalogue(currentPage: number, batchSize: number, totalCatalogueLength: number) {
    const isEndOfCatalogue = batchSize * currentPage >= totalCatalogueLength;
    //console.log(
    //    `checkEndOfCatalogue batchSize:${batchSize} * currentPage: ${currentPage} >= totalCatalogueLength ${totalCatalogueLength} = ${isEndOfCatalogue}`);
    return isEndOfCatalogue;

}
export default function mediasReducer(state = initialState, action: any) {
    const isEndOfCatalogue = checkEndOfCatalogue(
        BATCH_SIZE,
        state.currentPage,
        state.totalResultCount || action.payload?.resultCount || 200
    );
    switch (action.type) {
        case GET_MEDIAS:
            return { ...state, loading: true };
        case GET_MEDIAS_SUCCESS:
            let gmsResponse;
            if (isEndOfCatalogue) {
                gmsResponse = {
                    allMedias: action.payload.results,
                    medias: action.payload.results,
                    nextBatch: [],
                    currentPage: 1,
                    loading: false,
                    loaded: true,
                    isEndOfCatalogue: true,
                    hasErrors: false
                };
            } else {
                gmsResponse = {
                    allMedias: action.payload.results,
                    medias: action.payload.results.slice(0, BATCH_SIZE),
                    nextBatch: [],
                    currentPage: 1,
                    loading: false,
                    loaded: true,
                    isEndOfCatalogue: false,
                    hasErrors: false
                };
            }
            //console.log(`mediasReducer GET_MEDIAS_SUCCESS : ${JSON.stringify(gmsResponse)}`);
            return gmsResponse;
        case GET_MEDIAS_FAILURE:
            return { ...state, loading: false, hasErrors: true };
        case GET_NEXT_BATCH:
            let gnbResponse;
            if (isEndOfCatalogue) {
                gnbResponse = {
                    ...state,
                    isEndOfCatalogue: true,
                    nextBatch: [],
                };
            } else {
                const nextPage = state.currentPage + 1;
                gnbResponse = {
                    ...state,
                    nextBatch: state.allMedias.slice(state.currentPage * BATCH_SIZE, nextPage * BATCH_SIZE),
                    currentPage: nextPage,
                };
            }
            //console.log(`mediasReducer GET_NEXT_BATCH : ${JSON.stringify(gnbResponse)}`);
            return gnbResponse;
        case ADD_NEXT_BATCH:
            const anbResponse = {
                ...state,
                medias: [...state.medias, ...state.nextBatch],
                nextBatch: [],
            };
            //console.log(`mediasReducer ADD_NEXT_BATCH : ${JSON.stringify(anbResponse)}`);
            return anbResponse;
        default:
            return state;
    }
}