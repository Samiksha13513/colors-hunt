import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CollectionState {
  palettes: string[][];
}

const initialState: CollectionState = {
  palettes: [],
};

const collectionSlice = createSlice({
  name: 'collection',
  initialState,
  reducers: {
    addPalette: (state, action: PayloadAction<string[]>) => {
      state.palettes.push(action.payload);
    },
  },
});

export const { addPalette } = collectionSlice.actions;
export default collectionSlice.reducer;
