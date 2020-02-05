import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Folders from './components/Folders/Folders';
import store from './redux/reduxStore'
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const testTheme = createMuiTheme({
  palette: {
    type: "light"
  }
});

const App = () => {
  return (
    <div className="appWrapper">
      <Header>
        <Route path="/folders/:currentFolder?" render={() => <Folders />} />
      </Header>
    </div>
  );
}

const MainApp = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <ThemeProvider theme={testTheme}>
          <App />
        </ThemeProvider>
      </Provider>
    </BrowserRouter>
  )
};

export default MainApp;