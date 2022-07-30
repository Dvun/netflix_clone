import React, { memo } from 'react';
import { NextPage } from 'next';
import { IGenre, IMovieResponse } from '../../types/types';


interface Props {
  currentMovie: IMovieResponse | null
  genres: IGenre[]
}

const BottomSide: NextPage<Props> = memo(({currentMovie, genres}) => {

  return (
    <div className='flex space-x-16 rounded-b-md bg-[#181818] px-10 py-8'>
      <div className='space-y-6 text-lg'>
        <div className='flex items-center space-x-2 text-ms'>
          <p className='font-semibold text-green-400'>{currentMovie?.vote_average! * 10}% Match</p>
          <p className='font-light'>{currentMovie?.release_date}</p>
          <div className='flex h-4 items-center justify-center rounded border border-white/40 px-1.5 text-xs'>HD</div>
        </div>
        <div className='flex flex-col gap-x-10 gap-y-4 font-light md:flex-row'>
          <p className='w-5/6'>{currentMovie?.overview}</p>
          <div>
            <div className='flex flex-col space-y-3 text-sm'>
              <span className='text-[gray]'>Genres: </span>
              {genres.map(genre => genre.name).join(', ')}
            </div>
            <div>
              <span className='text-[gray]'>Original language: </span>
              {currentMovie?.original_language}
            </div>
            <div>
              <span className='text-[gray]'>Total votes: </span>
              {currentMovie?.vote_count}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default BottomSide;