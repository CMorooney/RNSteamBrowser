import {configureStore} from '@reduxjs/toolkit';
import libraryReducer from '../reducers/libraryReducer';
import wishlistReducer from '../reducers/wishlistReducer';

const store = configureStore({
  reducer: {
    library: libraryReducer,
    wishlist: wishlistReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
