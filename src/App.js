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
  return (
    <div className="appWrapper">
      <ThemeProvider theme={isLight ? lightTheme : darkTheme}>
        <Header isLight={isLight} setIsLight={setIsLight} >
          <Route path="/folders/:currentFolder?" render={() => <Folders />} />
        </Header>
      </ThemeProvider>
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