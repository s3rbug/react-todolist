import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Folders from "./components/Folders/Folders";
import store from "./redux/reduxStore";
import { Provider } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
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

const App = () => {
  const [isLight, setIsLight] = useState(true);
  const [drawerOpened, setDrawerOpened] = useState(false);
  return (
    <div className="app-wrapper">
      <ThemeProvider theme={isLight ? lightTheme : darkTheme}>
        <Header
          isLight={isLight}
          setIsLight={setIsLight}
          open={drawerOpened}
          setOpen={setDrawerOpened}
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
