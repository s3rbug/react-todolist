import React, { useCallback } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Folders from "./components/Folders/Folders";
import store, { useTypedSelector } from "./redux/reduxStore";
import { Provider, useDispatch } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import {
    setDrawerModeAction,
    setIsLightAction,
    setDrawerOpenedAction,
} from "./redux/actions/ui";
import { DrawerTypeEnum } from "./types/index_d";

const lightTheme = createMuiTheme({
    palette: {
        type: "light",
        success: {
            main: "#558B2F",
            dark: "#33691E",
        },
    },
});

const darkTheme = createMuiTheme({
    palette: {
        type: "dark",
        primary: {
            main: "#E87509",
            dark: "#C04D09",
        },
        success: {
            main: "#558B2F",
            dark: "#33691E",
        },
        secondary: {
            main: "#FF69B4",
        },
        action: {
            disabledBackground: "#121212",
        },
    },
});

const App = () => {
    const dispatch = useDispatch();

    const isLight = useTypedSelector((state) => state.ui.isLight);
    const drawerMode = useTypedSelector((state) => state.ui.drawerMode);
    const drawerOpened = useTypedSelector((state) => state.ui.drawerOpened);

    const setIsLight = useCallback(
        (light: boolean) => dispatch(setIsLightAction(light)),
        [dispatch]
    );
    const setDrawerMode = useCallback(
        (mode: DrawerTypeEnum) => dispatch(setDrawerModeAction(mode)),
        [dispatch]
    );
    const setDrawerOpened = (open: boolean) =>
        dispatch(setDrawerOpenedAction(open));

    return (
        <div className="app-wrapper">
            <ThemeProvider theme={isLight ? lightTheme : darkTheme}>
                <Header
                    isLight={isLight}
                    setIsLight={setIsLight}
                    open={drawerOpened}
                    setOpen={setDrawerOpened}
                    setDrawerMode={setDrawerMode}
                    drawerMode={drawerMode}
                >
                    <Switch>
                        <Route
                            path="/folders/:currentFolder?"
                            render={() => <Folders />}
                        />
                        <Route path="/" exact render={() => <Folders />} />
                        <Route
                            path="/react-todolist"
                            exact
                            render={() => <Folders />}
                        />
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
