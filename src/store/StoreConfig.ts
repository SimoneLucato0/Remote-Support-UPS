import { configureStore, Action } from "@reduxjs/toolkit";

import { RootReducer } from "./RootReducer";

import { applyMiddleware } from "redux";
import { ThunkAction } from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from "redux-thunk";
import RTCMiddleware from "./RTCMiddleware";


const composedEnhancer = composeWithDevTools(applyMiddleware(thunk, RTCMiddleware));

export const store = configureStore( {reducer: RootReducer, enhancers: [composedEnhancer] });

export type RootState = ReturnType<typeof RootReducer>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<String>
>;
