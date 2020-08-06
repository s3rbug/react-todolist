import React from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Folders from "./components/Folders/Folders";
import store, { AppStateType } from "./redux/reduxStore";
import { Provider } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { setDrawerMode, setIsLight, setDrawerOpened } from "./redux/actions/ui";
import { connect } from "react-redux";
import { DrawerTypeEnum } from "./types/index_d";

//palette.primary.main
const lightTheme = createMuiTheme({
  palette: {
    type: "light",
  },
});

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#E87509",
      dark: "#C04D09",
    },
    secondary: {
      main: "#FF69B4",
    },
    action: {
      disabledBackground: "#121212",
    },
  },
});

type OwnProps = {};

type PropsType = MapDispatchPropsType & MapStatePropsType;

const App = ({
  isLight,
  setIsLight,
  drawerOpened,
  setDrawerOpened,
  drawerMode,
  setDrawerMode,
}: PropsType) => {
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
          <div>
            <Route path="/folders/:currentFolder?" render={() => <Folders />} />
            <Route path="/" exact render={() => <Folders />} />
            <Route path="/react-todolist" exact render={() => <Folders />} />
          </div>
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

type MapStatePropsType = {
  drawerMode: DrawerTypeEnum;
  isLight: boolean;
  drawerOpened: boolean;
};
type MapDispatchPropsType = {
  setDrawerMode: (type: DrawerTypeEnum) => void;
  setIsLight: (isLight: boolean) => void;
  setDrawerOpened: (open: boolean) => void;
};

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
  drawerMode: state.ui.drawerMode,
  isLight: state.ui.isLight,
  drawerOpened: state.ui.drawerOpened,
});

const mapDispatchToProps: MapDispatchPropsType = {
  setDrawerMode,
  setIsLight,
  setDrawerOpened,
};

const AppWithConnect: any = connect<
  MapStatePropsType,
  MapDispatchPropsType,
  OwnProps,
  AppStateType
>(
  mapStateToProps,
  mapDispatchToProps
)(App);

const MainApp = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <AppWithConnect />
      </Provider>
    </BrowserRouter>
  );
};

export default MainApp;
