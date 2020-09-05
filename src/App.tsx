import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import store, { useTypedSelector } from "./redux/reduxStore";
import { Provider, useDispatch } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Folders from "./components/Folders";
import { setUi } from "./redux/middleware/ui";

const lightTheme = createMuiTheme({
	palette: {
		type: "light",
		chip: "#E0E0E0",
		success: {
			main: "#558B2F",
			dark: "#33691E",
		},
		background: {
			default: "#D3D3D3",
		},
	},
});

const darkTheme = createMuiTheme({
	palette: {
		type: "dark",
		chip: "#535353",
		primary: {
			main: "#2196F3",
		},
		success: {
			main: "#2a9d8f",
			dark: "#028090",
		},
		secondary: {
			main: "#e63946",
		},
		action: {
			disabledBackground: "#121212",
		},
	},
});

const App = () => {
	const dispatch = useDispatch();
	const [drawerOpened, setDrawerOpened] = useState(false);
	const isLight = useTypedSelector((state) => state.ui.isLight);
	useEffect(() => {
		dispatch(setUi());
	}, [dispatch]);
	return (
		<div className="app-wrapper">
			<ThemeProvider theme={isLight ? lightTheme : darkTheme}>
				<Header open={drawerOpened} setOpen={setDrawerOpened}>
					<Switch>
						<Route path="/folders/" render={() => <Folders />} />
						<Route exact path="/" render={() => <Folders />} />
						<Route exact path="/react-todolist" render={() => <Folders />} />
					</Switch>
				</Header>
			</ThemeProvider>
			<div
				className={drawerOpened ? "overlay" : ""}
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
