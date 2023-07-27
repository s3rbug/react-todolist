import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux"
import { configureStore, ThunkAction, AnyAction } from "@reduxjs/toolkit"

import { goalReducer, goalActions } from "./slices/goal"
import { uiReducer, uiActions } from "./slices/ui"
import { authReducer, authActions } from "./slices/auth"

const store = configureStore({
	reducer: {
		goal: goalReducer,
		ui: uiReducer,
		auth: authReducer,
	},
})

export type actions = typeof goalActions | typeof uiActions | typeof authActions
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
