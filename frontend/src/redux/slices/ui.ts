import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { UiStateType, ModalsType, LOCALS } from "../types/ui"

const initialState: UiStateType = {
	isLight: true,
	isPageLoading: false,
	usernameError: null,
	passwordError: null,
	lang: LOCALS.EN,
	modals: {
		addTag: false,
		editTag: false,
		addFolder: false,
		editFolder: false,
	},
}

const uiSlice = createSlice({
	name: "ui",
	initialState,
	reducers: {
		setIsLight: (state, action: PayloadAction<{ isLight: boolean }>) => {
			const { isLight } = action.payload
			state.isLight = isLight
		},
		setIsLoading: (state, action: PayloadAction<{ isLoading: boolean }>) => {
			const { isLoading } = action.payload
			state.isPageLoading = isLoading
		},
		setUsernameError: (
			state,
			action: PayloadAction<{ usernameError: string | null }>
		) => {
			const { usernameError } = action.payload
			state.usernameError = usernameError
		},
		setPasswordError: (
			state,
			action: PayloadAction<{ passwordError: string | null }>
		) => {
			const { passwordError } = action.payload
			state.passwordError = passwordError
		},
		clearAuthErrors: (state) => {
			state.passwordError = state.usernameError = null
		},
		setLanguage: (state, action: PayloadAction<{ lang: LOCALS }>) => {
			const { lang } = action.payload
			state.lang = lang
		},
		setModalOpen: (
			state,
			action: PayloadAction<{ type: keyof ModalsType; open: boolean }>
		) => {
			const { type, open } = action.payload
			state.modals[type] = open
		},
	},
})

export const uiActions = uiSlice.actions

export const uiReducer = uiSlice.reducer
