import React, { memo } from 'react';
import { Modal } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { showModal } from '../../redux/modalWindowSlice/modalWindowSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import TopSide from './TopSide';
import BottomSide from './BottomSide';


const ModalWindow = memo(() => {
  const dispatch = useAppDispatch()
  const {isShowModal} = useAppSelector(state => state.modalSlice)
  const {currentMovieTrailer, currentMovie, genres} = useAppSelector(state => state.movieSlice)

  const handleCloseModal = () => {
    dispatch(showModal(false))
  }

  return (
    <Modal
      open={isShowModal}
      onClose={handleCloseModal}
      className='fixed !top-7 left-0 right-0 z-50 mx-auto w-full
      max-w-5xl overflow-hidden overflow-y-scroll rounded-md scrollbar-hide'
    >
      <>
        <button
          onClick={handleCloseModal}
          className='modalButton absolute right-5 top-5 !z-40 h-9 w-9 border-none bg-[#181818]'
        >
          <FontAwesomeIcon icon={faXmark} className='h-6 w-6' />
        </button>
        <TopSide currentMovieTrailer={currentMovieTrailer}/>
        <BottomSide currentMovie={currentMovie} genres={genres}/>
      </>
    </Modal>
  );
});

export default ModalWindow;