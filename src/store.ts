import { combineReducers, configureStore } from '@reduxjs/toolkit'

import foodsReducer, { SLICE_NAME } from './features/foods/redux/foodsSlice.ts'

export const rootReducer = combineReducers({
  [SLICE_NAME]: foodsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});

export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
