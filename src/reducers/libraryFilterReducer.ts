import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

interface LibraryListFilterState {
  showPlayedGames: boolean;
  showUnplayedGames: boolean;
  reverseSort: boolean;
  sortBy: 'name' | 'last played' | 'playtime';
}

const initialState: LibraryListFilterState = {
  showPlayedGames: true,
  showUnplayedGames: true,
  reverseSort: false,
  sortBy: 'last played',
};

export const libraryListFilterSlice = createSlice({
  name: 'libraryListFilter',
  initialState: initialState,
  reducers: {
    setShowPlayedGames(state, action: PayloadAction<boolean>) {
      state.showPlayedGames = action.payload;
    },
    setShowUnplayedGames(state, action: PayloadAction<boolean>) {
      state.showUnplayedGames = action.payload;
    },
    setReverseSort(state, action: PayloadAction<boolean>) {
      state.reverseSort = action.payload;
    },
    setSortBy(
      state,
      action: PayloadAction<'name' | 'last played' | 'playtime'>,
    ) {
      state.sortBy = action.payload;
    },
  },
});

export const {
  setShowPlayedGames,
  setShowUnplayedGames,
  setReverseSort,
  setSortBy,
} = libraryListFilterSlice.actions;
export default libraryListFilterSlice.reducer;
