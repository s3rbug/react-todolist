import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import ToDoList from './components/ToDoList/ToDoList';
import store from './redux/reduxStore'
import { Provider } from 'react-redux';

const App = () => {
  return (
    <div className="appWrapper">
      <Header />
      <ToDoList />
    </div>
  );
}

const MainApp = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
};

export default MainApp;