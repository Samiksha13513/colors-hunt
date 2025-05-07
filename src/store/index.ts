import { configureStore } from '@reduxjs/toolkit';
import collectionReducer from './slices/collectionSlice.tsx';

export const store = configureStore({
  reducer: {
    collection: collectionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
