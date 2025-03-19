import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { List, DefaultLists } from '../types';

interface ListsState {
  lists: List[];
  loading: boolean;
  error: string | null;
  selectedList: List | null;
}

const initialState: ListsState = {
  lists: [],
  loading: false,
  error: null,
  selectedList: null
};

const listsSlice = createSlice({
  name: 'lists',
  initialState,
  reducers: {
    fetchListsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchListsSuccess: (state, action: PayloadAction<List[]>) => {
      state.lists = action.payload;
      state.loading = false;
    },
    fetchListsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    addList: (state, action: PayloadAction<List>) => {
      state.lists.push(action.payload);
    },
    updateList: (state, action: PayloadAction<List>) => {
      const index = state.lists.findIndex(list => list.id === action.payload.id);
      if (index !== -1) {
        state.lists[index] = action.payload;
      }
    },
    deleteList: (state, action: PayloadAction<string>) => {
      state.lists = state.lists.filter(list => list.id !== action.payload);
    },
    setSelectedList: (state, action: PayloadAction<List | null>) => {
      state.selectedList = action.payload;
    }
  }
});

export const { 
  fetchListsStart, 
  fetchListsSuccess, 
  fetchListsFailure,
  addList,
  updateList,
  deleteList,
  setSelectedList
} = listsSlice.actions;

export default listsSlice.reducer;
