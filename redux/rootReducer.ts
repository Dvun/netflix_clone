import { combineReducers } from 'redux';
import movieSlice from './movieSlice/movieSlice';
import modalWindowSlice from './modalWindowSlice/modalWindowSlice';


export const rootReducer = combineReducers({
  movieSlice: movieSlice,
  modalSlice: modalWindowSlice,
})