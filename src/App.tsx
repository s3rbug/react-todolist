import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import store, { useTypedSelector } from "./redux/reduxStore";
import { Provider, useDispatch } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import Folders from "./components/Folders";
import { setUi } from "./redux/middleware/ui";
import { themes } from "./utils/themes";
import clsx from "clsx";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";

const App = () => {
	const dispatch = useDispatch();
	const [drawerOpened, setDrawerOpened] = useState(false);
	const isLight = useTypedSelector((state) => state.ui.isLight);
	const serverless = useTypedSelector((state) => state.ui.serverless);
	useEffect(() => {
		if (!serverless) {
			dispatch(setUi());
		}
	}, [dispatch, serverless]);
	return (
		<div className="app-wrapper">
			<ThemeProvider theme={isLight ? themes.lightTheme : themes.darkTheme}>
				<Header open={drawerOpened} setOpen={setDrawerOpened}>
					<Switch>
						<Route
							path="/react-todolist"
							render={() => <Folders />}
							exact
						/>
						<Route
							path="/react-todolist/login"
							render={() => <Login />}/>
						<Route
							path="/react-todolist/register"
							render={() => <Register />}/>
					</Switch>
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
