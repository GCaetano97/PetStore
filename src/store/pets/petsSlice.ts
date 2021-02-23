/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface petObject {
  id: number;
  category: {
    id: number;
    name: string;
  };
  name: string;
  photoUrls: [string];
  tags: [
    {
      id: number;
      name: string;
    },
  ];
  status: string;
}

export interface petsState {
  filter: string,
  pets: petObject[],
}

const initialState: petsState = {
  filter: 'available',
  pets: [],
};

const petsSlice = createSlice({
  name: 'pets',
  initialState,
  reducers: {
    setFilter: (state, { payload }: PayloadAction<string>) => {
      state.filter = payload;
    },
    setPets: (state, { payload }: PayloadAction<petObject[]>) => {
      state.pets = payload;
    },
  },
});

export const { setFilter, setPets } = petsSlice.actions;
export default petsSlice.reducer;
export const petsSelector = (state: {petsStore: petsState}) => state.petsStore;
