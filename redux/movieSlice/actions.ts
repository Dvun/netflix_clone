import { AppDispatch } from '../store';
import { loadingMovie, setCurrentMovie } from './movieSlice';
import { IMovie, IMovieResponse } from '../../types/types';
import axios from 'axios'


export const getCurrentMovie = (movie: IMovie | null) => async (dispatch: AppDispatch) => {
  dispatch(loadingMovie(true))
  await axios.get<IMovieResponse>(
    `https://api.themoviedb.org/3/${movie?.media_type === 'tv' ?
      'tv'
      :
      'movie'}/${movie?.id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&append_to_response=videos`)
    .then((response) => dispatch(setCurrentMovie(response.data)))
}