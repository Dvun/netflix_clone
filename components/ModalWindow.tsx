import React, { memo, useCallback, useEffect } from 'react';
import { Modal } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { showModal } from '../redux/modalWindowSlice/modalWindowSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';


const ModalWindow = memo(() => {
  const dispatch = useAppDispatch()
  const {isShowModal} = useAppSelector(state => state.modalSlice)
  const {movie} = useAppSelector(state => state.movieSlice)

  useEffect(() => {
    if (!movie) return
    fetchMovie()
  }, [movie])

  const fetchMovie = useCallback(async() => {
    const data = await fetch(
      `https://api.themoviedb.org/3/${movie?.media_type === 'tv' ? 
        'tv' 
        : 
        'movie'}/${movie?.id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&append_to_response=videos`)
      .then((response) => response.json())
  }, [])

  const handleCloseModal = () => {
    dispatch(showModal(false))
  }

  return (
    <Modal
      open={isShowModal}
      onClose={handleCloseModal}
    >
      <>
        <button
          onClick={handleCloseModal}
          className='modalButton absolute right-5 top-5 !z-40 h-9 w-9 border-none bg-[#181818]'
        >
          <FontAwesomeIcon icon={faXmark} className='h-6 w-6' />
        </button>

        <div>

        </div>
      </>
    </Modal>
  );
});

export default ModalWindow;