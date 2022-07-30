import React, { memo } from 'react';
import { NextPage } from 'next';
import { IMovie } from '../types/types';
import Image from 'next/image';
import { useAppDispatch } from '../hooks/reduxHooks';
import { showModal } from '../redux/modalWindowSlice/modalWindowSlice';
import { getCurrentMovie } from '../redux/movieSlice/actions';


interface Props {
  movie: IMovie
}

const Thumbnail: NextPage<Props> = memo(({movie}) => {
  const dispatch = useAppDispatch()

  const handleOpenModal = () => {
    dispatch(showModal(true))
    dispatch(getCurrentMovie(movie))
  }

  return (
    <div className='relative h-28 min-w-[180px] transition duration-200
    ease-out md:h-36 md:min-w-[260px] md:hover:scale-105 cursor-pointer'
         onClick={handleOpenModal}
    >
      <Image src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path || movie.poster_path}`}
             className='rounded-sm object-cover md:rounded'
             layout='fill'
      />
    </div>
  );
});

export default Thumbnail;