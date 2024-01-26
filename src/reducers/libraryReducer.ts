import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {getOwnedGames} from '../api/steamApi';
import {SteamGame} from '../models/steamModels';

interface LibraryState {
  loading: boolean;
  games: SteamGame[];
  error?: string;
}

const initialState: LibraryState = {
  loading: false,
  games: [],
  error: undefined,
};

export const fetchUserLibrary = createAsyncThunk(
  'library/fetchUserLibrary',
  async () => await getOwnedGames(),
);

export const librarySlice = createSlice({
  name: 'library',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchUserLibrary.pending, state => {
      state.error = undefined;
      state.loading = true;
    });
    builder.addCase(fetchUserLibrary.fulfilled, (state, action) => {
      state.games = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchUserLibrary.rejected, state => {
      state.loading = false;
    });
  },
});

export const {} = librarySlice.actions;
export default librarySlice.reducer;
