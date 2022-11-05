import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { api } from "../services/api";
import { customizerSlice, filtersSlice } from "./slices";

const store = configureStore({
  reducer: {
    filters: filtersSlice,
    customizer: customizerSlice,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;
