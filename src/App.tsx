import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import store, { useTypedSelector } from "./redux/reduxStore";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import Folders from "./components/Folders";
import { themes } from "./utils/themes";
import clsx from "clsx";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";

const App = () => {
	const [drawerOpened, setDrawerOpened] = useState(false);
	const isLight = useTypedSelector((state) => state.ui.isLight);
	
	return (
		<div className="app-wrapper">
			<ThemeProvider theme={isLight ? themes.lightTheme : themes.darkTheme}>
				<Header open={drawerOpened} setOpen={setDrawerOpened}>
					<Routes>
						<Route
							path="/react-todolist"
							element={<Folders />}
						/>
						<Route
							path="/react-todolist/login"
							element={<Login />}
						/>
						<Route
							path="/react-todolist/register"
							element={<Register />}
						/>
					</Routes>
				</Header>
			</ThemeProvider>
			<div
				className={clsx(
					drawerOpened && "overlay"
				)}
				onClick={() => {
					setDrawerOpened(false);
				}}
			/>
		</div>
	);
};

const MainApp = () => {
	return (
		<BrowserRouter>
			<Provider store={store}>
				<App />
			</Provider>
		</BrowserRouter>
	);
};

export default MainApp;
