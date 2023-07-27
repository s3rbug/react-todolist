export enum LOCALS {
	EN = "en",
	UA = "uk-UA",
}

export type UiStateType = {
	isLight: boolean
	isPageLoading: boolean
	usernameError: string | null
	passwordError: string | null
	lang: LOCALS
	modals: ModalsType
}

export type ThemeResponseType = {
	isLight: boolean
}

export type ModalsType = {
	addTag: boolean
	editTag: boolean
	addFolder: boolean
	editFolder: boolean
}
