import { useEffect } from "react"
import {
	LOCAL_STORAGE_KEY,
	localStorageWrapper,
} from "../utils/localStorageWrapper"
import { LoginResponseType } from "../types/index_d"
import { setApiHeader } from "../api/config"
import { setUserData } from "../redux/middleware/goal"
import { uiActions } from "../redux/slices/ui"
import { authActions } from "../redux/slices/auth"
import { useTypedDispatch } from "../redux/store"

type ArgumentsType = {
	token: string | null
}

export const useLocalStorageAuth = ({ token }: ArgumentsType) => {
	const dispatch = useTypedDispatch()

	useEffect(() => {
		const localStorageUser =
			localStorageWrapper.getLocalStorageItem<LoginResponseType>(
				LOCAL_STORAGE_KEY.ACCESS_TOKEN
			)
		if (token) {
			dispatch(uiActions.setIsLoading({ isLoading: true }))
			dispatch(setUserData())
		} else if (!token && localStorageUser) {
			setApiHeader(localStorageUser.accessToken)
			dispatch(
				authActions.setUser({
					token: localStorageUser.accessToken,
					username: localStorageUser.username,
				})
			)
		}
	}, [dispatch, token])
}
