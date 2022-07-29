import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IModalInitialState } from '../../types/types';


const initialState: IModalInitialState = {
  isShowModal: false
}

const modalWindowSlice = createSlice({
  name: 'modalSlice',
  initialState: initialState,
  reducers: {

    showModal: (state, action: PayloadAction<boolean>) => {
      state.isShowModal = action.payload
    }

  }
})

export default modalWindowSlice.reducer
export const {
  showModal
} = modalWindowSlice.actions