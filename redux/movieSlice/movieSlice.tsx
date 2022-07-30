import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IMovie, IMovieResponse, IMovieSLiceInitialState } from '../../types/types';


const initialState: IMovieSLiceInitialState = {
  isLoading: false,
  currentMovie: null,
  bannerRandomMovie: null,
  currentMovieTrailer: null,
  genres: []
}

const movieSlice = createSlice({
  name: 'movieSlice',
  initialState: initialState,
  reducers: {

    loadingMovie: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
      state.currentMovie = null
    },

    setBannerRandomMovie: (state, action: PayloadAction<IMovie | null>) => {
      state.bannerRandomMovie = action.payload
    },

    setCurrentMovie: (state, action: PayloadAction<IMovieResponse | null>) => {
      state.isLoading = false
      state.currentMovie = action.payload
      const index: any = action.payload?.videos?.results.findIndex((value: any) => value.type === 'Trailer')
      state.currentMovieTrailer = action.payload?.videos.results[index]?.key || null
      state.genres = action.payload?.genres || []
    }

  }
})

export default movieSlice.reducer
export const {
  loadingMovie,
  setBannerRandomMovie,
  setCurrentMovie
} = movieSlice.actions