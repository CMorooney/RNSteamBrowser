import {configureStore} from '@reduxjs/toolkit';
import libraryReducer from '../reducers/libraryReducer';
import wishlistReducer from '../reducers/wishlistReducer';
import gameDetailsReducer from '../reducers/gameDetailsReducer';
import libraryFilterReducer from '../reducers/libraryFilterReducer';

const store = configureStore({
  reducer: {
    library: libraryReducer,
    wishlist: wishlistReducer,
    gameDetails: gameDetailsReducer,
    libraryFilter: libraryFilterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
