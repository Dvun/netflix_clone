import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IMovie, IMovieSLiceInitialState } from '../../types/types';


const initialState: IMovieSLiceInitialState = {
  movie: null,
  isLoading: false
}

const movieSlice = createSlice({
  name: 'movieSlice',
  initialState: initialState,
  reducers: {

    loadingMovie: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },

    setCurrentMovie: (state, action: PayloadAction<IMovie | null>) => {
      state.isLoading = false
      state.movie = action.payload
    }

  }
})

export default movieSlice.reducer
export const {
  loadingMovie,
  setCurrentMovie
} = movieSlice.actions