import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Folders from './components/Folders/Folders';
import store from './redux/reduxStore'
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const lightTheme = createMuiTheme({
  palette: {
    type: "light"
  }
});

const darkTheme = createMuiTheme({
  palette: {
    type: "dark"
  }
});


const App = () => {
  const [isLight, setIsLight] = React.useState(true)
  const [drawerOpened, setDrawerOpened] = React.useState(false)
  return (
    <div className="app-wrapper">
      <ThemeProvider theme={isLight ? lightTheme : darkTheme}>
        <Header isLight={isLight} setIsLight={setIsLight} open={drawerOpened} setOpen={setDrawerOpened}>
          <Route path="/folders/:currentFolder?" render={() => <Folders />} />
        </Header>
      </ThemeProvider>
      <div className={drawerOpened ? "overlay" : ""} onClick={() => { setDrawerOpened(false) }} />
    </div >
  );
}

const MainApp = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  )
};

export default MainApp;