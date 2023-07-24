import { Header } from "../../layout"
import { useTypedSelector } from "../../redux/store"
import { Route, Routes } from "react-router-dom"
import { ThemeProvider } from "@mui/material/styles"
import { themes } from "../../utils/themes"
import { Login, Register, Folders } from "../../pages"
import { useLocalStorageTheme } from "../../hooks/useLocalStorageTheme"

export const App = () => {
	useLocalStorageTheme()
	const isLight = useTypedSelector((state) => state.ui.isLight)

	return (
		<ThemeProvider theme={isLight ? themes.lightTheme : themes.darkTheme}>
			<Header>
				<Routes>
					<Route path="/react-todolist" element={<Folders />} />
					<Route path="/react-todolist/login" element={<Login />} />
					<Route path="/react-todolist/register" element={<Register />} />
				</Routes>
			</Header>
		</ThemeProvider>
	)
}
