import { setApiHeader } from "../../api/config"
import { authActions } from "./../slices/auth"
import { authApi } from "./../../api/authApi"
import {
	localStorageWrapper,
	LOCAL_STORAGE_KEY,
} from "../../utils/localStorageWrapper"
import { AppThunkType } from "../store"
import { uiActions } from "../slices/ui"
import axios, { AxiosError } from "axios"

type UserCredentialsType = {
	username: string
	password: string
}

export const login =
	({ username, password }: UserCredentialsType): AppThunkType =>
	async (dispatch) => {
		return authApi
			.login({ username, password })
			.then((response) => {
				if (response.status === 201) {
					const { username, accessToken } = response.data
					dispatch(authActions.setUser({ token: accessToken, username }))
					setApiHeader(accessToken)
					localStorageWrapper.setLocalStorageItem(
						LOCAL_STORAGE_KEY.ACCESS_TOKEN,
						{ username, accessToken }
					)
					dispatch(uiActions.clearAuthErrors())
				}
			})
			.catch((error: Error | AxiosError) => {
				if (!axios.isAxiosError(error) || !error?.response?.data?.message) {
					return
				}
				const { message } = error.response.data

				if (!message) {
					return
				}
				if (message.includes("Wrong password")) {
					dispatch(uiActions.setPasswordError({ passwordError: message }))
				} else {
					dispatch(uiActions.setUsernameError({ usernameError: message }))
				}
			})
	}

export const register =
	({ username, password }: UserCredentialsType): AppThunkType =>
	async (dispatch) => {
		return authApi
			.register({ username, password })
			.then((response) => {
				if (response.status === 201) {
					const { username, accessToken } = response.data
					dispatch(authActions.setUser({ token: accessToken, username }))
					setApiHeader(accessToken)
					localStorageWrapper.setLocalStorageItem(
						LOCAL_STORAGE_KEY.ACCESS_TOKEN,
						{ username, accessToken }
					)
				}
			})
			.catch((error: Error | AxiosError) => {
				if (!axios.isAxiosError(error) || !error?.response?.data?.message) {
					return
				}
				const { message } = error.response.data

				if (!message) {
					return
				}
				if (message.includes("already exists")) {
					dispatch(uiActions.setUsernameError({ usernameError: message }))
				}
			})
	}
