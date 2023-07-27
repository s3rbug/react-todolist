import { useEffect } from "react"
import {
	LOCAL_STORAGE_KEY,
	localStorageWrapper,
} from "../utils/localStorageWrapper"
import { ThemeResponseType } from "../redux/types/ui"
import { uiActions } from "../redux/slices/ui"
import { useTypedDispatch } from "../redux/store"

export const useLocalStorageTheme = () => {
	const dispatch = useTypedDispatch()

	useEffect(() => {
		const localStorageIsLight =
			localStorageWrapper.getLocalStorageItem<ThemeResponseType>(
				LOCAL_STORAGE_KEY.IS_LIGHT
			)

		if (localStorageIsLight) {
			dispatch(uiActions.setIsLight({ isLight: localStorageIsLight.isLight }))
		}
	}, [dispatch])
}
