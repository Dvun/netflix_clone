import { User } from 'firebase/auth';

export interface IGenre {
  id: number
  name: string
}

export interface IMovie {
  title: string
  backdrop_path: string
  media_type?: string
  release_date?: string
  first_air_date: string
  genre_ids: number[]
  id: number
  name: string
  origin_country: string[]
  original_language: string
  original_name: string
  overview: string
  popularity: number
  poster_path: string
  vote_average: number
  vote_count: number
}

export interface IElement {
  type:
    | 'Bloopers'
    | 'Featurette'
    | 'Behind the Scenes'
    | 'Clip'
    | 'Trailer'
    | 'Teaser'
}

export enum Scroll {
  LEFT = 'left',
  RIGHT = 'right'
}

export interface ILoginAndRegister {
  email: string
  password: string
}

export interface IAuth {
  user: User | null
  signUp: (email: string, password: string) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  error: string | null
  isLoading: boolean
}

export interface IMovieSLiceInitialState {
  currentMovie: IMovieResponse | null
  bannerRandomMovie: IMovie | null
  isLoading: boolean
  currentMovieTrailer: string | null,
  genres: IGenre[]
}

export interface IModalInitialState {
  isShowModal: boolean
}

interface IBelongsToCollection {
  id: number
  name: string
  poster_path: string
  backdrop_path: string
}

export interface IProductionCompanies {
  id: number
  logo_path: string
  name: string
  origin_country: string
}

export interface IProductionCountries {
  iso_3166_1: string
  name: string
}

export interface ISpokenLanguages {
  english_name: string
  iso_639_1: string
  name: string
}

export interface IVideos {
  iso_639_1: string
  iso_3166_1: string
  name: string
  key: string
  site: string
  size: number
  type: string
  official: boolean
  published_at: string
  id: string
}


export interface IMovieResponse {
  adult: boolean
  backdrop_path: string
  belongs_to_collection: IBelongsToCollection
  budget: number
  genres: IGenre[]
  homepage: string
  id: number
  imdb_id: string
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  production_companies: IProductionCompanies[]
  production_countries: IProductionCountries[]
  release_date: string
  revenue: number
  runtime: number
  spoken_languages: ISpokenLanguages[]
  status: string
  tagline: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
  videos: {results: IVideos[]}
}