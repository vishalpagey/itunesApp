import { combineReducers } from 'redux';
import albumsReducer from './albumsReducer.js';

export default combineReducers({
    albums: albumsReducer
}); 