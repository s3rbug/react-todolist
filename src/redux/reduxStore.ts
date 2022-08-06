import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import goal from "./slices/goal"
import ui from "./slices/ui"
import auth from "./slices/auth"

import { TypedUseSelectorHook, useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
	reducer: {
		goal,
		ui,
		auth
	}
});

export type AppDispatchType = typeof store.dispatch;
export type AppStateType = ReturnType<typeof store.getState>;

export type AppThunkType<ReturnType = Promise<void>> = ThunkAction<
	ReturnType,
	AppStateType,
	unknown,
	AnyAction
>

export const useTypedSelector: TypedUseSelectorHook<AppStateType> = useSelector;
export const useTypedDispatch = () => useDispatch<AppDispatchType>()

export default store;
