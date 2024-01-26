import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {getByQuery, getBySlugOrId} from '../api/rawgApi';
import {RAWGGame} from '../models/rawgModels';

interface GameDetailsState {
  loading: boolean;
  game?: RAWGGame;
  error?: string;
}

const initialState: GameDetailsState = {
  loading: false,
};

export const queryGame = createAsyncThunk(
  'gameDetails/queryGames',
  async (q: string) => {
    const qResult = await getByQuery(q);
    if (qResult.length > 0) {
      const game = await getBySlugOrId(qResult[0].id);
      return game;
    }
    throw new Error(`couldn't match game ${q} to RAWG API`);
  },
);

export const gameDetailsSlice = createSlice({
  name: 'gameDetails',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(queryGame.pending, state => {
      state.error = undefined;
      state.loading = true;
    });
    builder.addCase(queryGame.fulfilled, (state, action) => {
      state.loading = false;
      state.game = action.payload;
    });
    builder.addCase(queryGame.rejected, state => {
      state.loading = false;
    });
  },
});

export const {} = gameDetailsSlice.actions;
export default gameDetailsSlice.reducer;
