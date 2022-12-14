import React, { memo, useEffect } from 'react';
import Image from 'next/image';
import { NextPage } from 'next';
import { IMovie } from '../types/types';
import { baseUrl } from '../constants/movieBaseUrl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faPlay } from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { showModal } from '../redux/modalWindowSlice/modalWindowSlice';
import { setBannerRandomMovie } from '../redux/movieSlice/movieSlice';
import { getCurrentMovie } from '../redux/movieSlice/actions';

interface Props {
  netflixOriginals: IMovie[]
}

const Banner: NextPage<Props> = memo(({netflixOriginals}) => {
  const dispatch = useAppDispatch()
  const {bannerRandomMovie} = useAppSelector(state => state.movieSlice)

  useEffect(() => {
    dispatch(setBannerRandomMovie(netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)]))
  },[netflixOriginals])

  const handleSelectMovie = () => {
    dispatch(showModal(true))
    dispatch(getCurrentMovie(bannerRandomMovie))
  }

  return (
    <div className='flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[65vh] lg:justify-end lg:pb-12'>
      <div className='absolute top-0 left-0 -z-10 h-[95vh] w-screen'>
        <Image
          src={`${baseUrl}/${bannerRandomMovie?.backdrop_path || bannerRandomMovie?.poster_path}`}
          layout='fill'
          objectFit='cover'
          loading='lazy'
        />
      </div>

      <h1 className='text-2xl lg:text-7xl md:text-4xl'>
        {bannerRandomMovie?.title || bannerRandomMovie?.name || bannerRandomMovie?.original_name}
      </h1>
      <p className='max-w-xs text-shadow-md text-xs md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl'>
        {bannerRandomMovie?.overview}
      </p>

      <div className='flex space-x-3 '>
        <button className='bannerButton bg-white text-black'>
          <FontAwesomeIcon icon={faPlay} className='h-4 w-4 text-black md:h-7 md:w-7'/>
          Play
        </button>
        <button className='bannerButton bg-[gray]/70' onClick={handleSelectMovie}>
          <FontAwesomeIcon icon={faCircleInfo} className='h-5 w-5 md:h-8 md:w-8'/>
          More Info
        </button>
      </div>
    </div>
  );
});

export default Banner;