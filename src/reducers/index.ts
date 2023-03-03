import { combineReducers } from 'redux';
import mediasReducer from './mediasReducer';
const rootReducer=combineReducers({
    medias: mediasReducer
});
export default rootReducer;