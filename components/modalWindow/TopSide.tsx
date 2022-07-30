import React, { memo, useState } from 'react';
import { NextPage } from 'next';
import ReactPlayer from 'react-player/lazy';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPlus, faThumbsUp, faVolumeHigh, faVolumeXmark } from '@fortawesome/free-solid-svg-icons';


interface Props {
  currentMovieTrailer: string | null
}

const TopSide: NextPage<Props> = memo(({currentMovieTrailer}) => {
  const [isMuted, setIsMuted] = useState<boolean>(false)

  return (
    <div className='relative pt-[56.25%]'>
      <ReactPlayer
        url={`https://www.youtube.com/watch?v=${currentMovieTrailer}`}
        width='100%'
        height='100%'
        style={{position: 'absolute', top: 0, left: 0}}
        playing
        muted={isMuted}
      />
      <div className='absolute bottom-10 flex w-full items-center justify-between px-10'>
        <div className='flex space-x-2'>
          <button className='flex items-center gap-x-2 rounded bg-white px-8
              text-xl font-bold text-black transition hover:bg-[#e6e6e6]'>
            <FontAwesomeIcon icon={faPlay} className='h-7 w-7 text-black'/>
            Play
          </button>
          <button className='modalButton'>
            <FontAwesomeIcon icon={faPlus} className='h-7 w-7'/>
          </button>
          <button className='modalButton'>
            <FontAwesomeIcon icon={faThumbsUp} className='h-7 w-7'/>
          </button>
        </div>
        <button className='modalButton' onClick={() => setIsMuted(prevState => !prevState)}>
          {isMuted ?
            <FontAwesomeIcon icon={faVolumeXmark} className='h-6 w-6'/>
            :
            <FontAwesomeIcon icon={faVolumeHigh} className='h-6 w-6'/>
          }
        </button>
      </div>
    </div>
  );
});

export default TopSide;