import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import todo from "./todo";

const reducers = combineReducers({
  todo: todo
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // required for Redux extension
let store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));

export default store;
