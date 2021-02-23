/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface modalState {
  modal: boolean,
  modalMessage: string,
}

const initialState: modalState = {
  modal: false,
  modalMessage: '',
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setModal: (state, { payload }: PayloadAction<boolean>) => {
      state.modal = payload;
    },
    setModalMessage: (state, { payload }: PayloadAction<string>) => {
      state.modalMessage = payload;
    },
  },
});

export const { setModal, setModalMessage } = modalSlice.actions;
export default modalSlice.reducer;
export const modalSelector = (state: { modalStore: modalState }) => state.modalStore;
