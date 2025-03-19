import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './tasksSlice';
import listsReducer from './listsSlice'; // Será criado posteriormente

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    lists: listsReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
