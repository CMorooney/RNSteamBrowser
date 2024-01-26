import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {getWishlist} from '../api/steamApi';
import {SteamWishlistedGame} from '../models/steamModels';

interface WishlistState {
  loading: boolean;
  games: SteamWishlistedGame[];
  error?: string;
}

const initialState: WishlistState = {
  loading: false,
  games: [],
  error: undefined,
};

export const fetchWishlist = createAsyncThunk(
  'wishlist/fetchWishlist',
  async () => await getWishlist(),
);

export const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchWishlist.pending, state => {
      state.error = undefined;
      state.loading = true;
    });
    builder.addCase(fetchWishlist.fulfilled, (state, action) => {
      state.games = Array.from(action.payload.values());
      state.loading = false;
    });
    builder.addCase(fetchWishlist.rejected, state => {
      state.loading = false;
    });
  },
});

export const {} = wishlistSlice.actions;
export default wishlistSlice.reducer;
