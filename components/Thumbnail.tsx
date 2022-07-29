import React, { memo } from 'react';
import { NextPage } from 'next';
import { IMovie } from '../types/types';
import Image from 'next/image';


interface Props {
  movie: IMovie
  // movie: IMovie | DocumentData
}

const Thumbnail: NextPage<Props> = memo(({movie}) => {

  return (
    <div className='relative h-28 min-w-[180px] transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105'>
      <Image src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path || movie.poster_path}`}
             className='rounded-sm object-cover md:rounded'
             layout='fill'
      />
    </div>
  );
});

export default Thumbnail;