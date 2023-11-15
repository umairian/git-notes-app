import { configureStore } from "@reduxjs/toolkit";
import {
  persistReducer,
  persistStore,
} from "redux-persist";
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import AuthSliceReducer from "./slices/Auth";

const reducers = combineReducers({
  auth: AuthSliceReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export type RootState = ReturnType<typeof persistedReducer>;

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);