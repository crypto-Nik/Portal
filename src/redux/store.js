import { configureStore } from "@reduxjs/toolkit";
import { teknorixApi } from "./api";

export const store = configureStore({
  reducer: {
    [teknorixApi.reducerPath]: teknorixApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(teknorixApi.middleware),
});

export const dispatch = store.dispatch;
