import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux"
import { configureStore, ThunkAction, AnyAction } from "@reduxjs/toolkit"

import { goalReducer } from "./slices/goal"
import { uiReducer } from "./slices/ui"
import { authReducer } from "./slices/auth"

const store = configureStore({
	reducer: {
		goal: goalReducer,
		ui: uiReducer,
		auth: authReducer,
	},
})

export type AppDispatchType = typeof store.dispatch
export type AppStateType = ReturnType<typeof store.getState>

export type AppThunkType<ReturnType = Promise<void>> = ThunkAction<
	ReturnType,
	AppStateType,
	unknown,
	AnyAction
>

export const useTypedSelector: TypedUseSelectorHook<AppStateType> = useSelector
export const useTypedDispatch = () => useDispatch<AppDispatchType>()

export default store
