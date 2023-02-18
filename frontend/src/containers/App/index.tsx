import { useEffect, useState } from "react"
import "./index.css"
import { Header } from "../../layout"
import store, {
	useTypedDispatch,
	useTypedSelector,
} from "../../redux/reduxStore"
import { Provider } from "react-redux"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ThemeProvider } from "@mui/material/styles"
import { themes } from "../../utils/themes"
import clsx from "clsx"
import { Login, Register, Folders } from "../../pages"
import {
	localStorageWrapper,
	LOCAL_STORAGE_KEY,
} from "../../localStorage/localStorageWrapper"
import { uiActions } from "../../redux/slices/ui"
import { ThemeResponseType } from "../../types/index_d"

const AppWithoutWrappers: React.FC = () => {
	const dispatch = useTypedDispatch()
	const [drawerOpened, setDrawerOpened] = useState(false)
	const isLight = useTypedSelector((state) => state.ui.isLight)

	useEffect(() => {
		const localStorageIsLight =
			localStorageWrapper.getLocalStorageItem<ThemeResponseType>(
				LOCAL_STORAGE_KEY.IS_LIGHT
			)

		if (localStorageIsLight) {
			dispatch(uiActions.setIsLight({ isLight: localStorageIsLight.isLight }))
		}
	}, [dispatch])

	return (
		<div className="app-wrapper" data-testid="app-wrapper">
			<ThemeProvider theme={isLight ? themes.lightTheme : themes.darkTheme}>
				<Header open={drawerOpened} setOpen={setDrawerOpened}>
					<Routes>
						<Route path="/react-todolist" element={<Folders />} />
						<Route path="/react-todolist/login" element={<Login />} />
						<Route path="/react-todolist/register" element={<Register />} />
					</Routes>
				</Header>
			</ThemeProvider>
			<div
				className={clsx(drawerOpened && "overlay")}
				onClick={() => {
					setDrawerOpened(false)
				}}
			/>
		</div>
	)
}

export const App = () => {
	return (
		<BrowserRouter>
			<Provider store={store}>
				<AppWithoutWrappers />
			</Provider>
		</BrowserRouter>
	)
}
