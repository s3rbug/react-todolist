import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import todo from "./reducers/todo";
import ui from "./reducers/ui";
import { TypedUseSelectorHook, useSelector } from "react-redux";

const rootReducer = combineReducers({
	todo: todo,
	ui: ui,
});

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>;
export type AppDispatch = typeof store.dispatch;

export const useTypedSelector: TypedUseSelectorHook<AppStateType> = useSelector;

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // required for Redux extension

let store = createStore(
	rootReducer,
	composeEnhancers(applyMiddleware(thunkMiddleware))
);

export const isMobile = {
	Android: () => navigator.userAgent.match(/Android/i),
	BlackBerry: () => navigator.userAgent.match(/BlackBerry/i),
	iOS: () => navigator.userAgent.match(/iPhone|iPad|iPod/i),
	Opera: () => navigator.userAgent.match(/Opera Mini/i),
	Windows: () =>
		navigator.userAgent.match(/IEMobile/i) ||
		navigator.userAgent.match(/WPDesktop/i),
	any: () =>
		isMobile.Android() ||
		isMobile.BlackBerry() ||
		isMobile.iOS() ||
		isMobile.Opera() ||
		isMobile.Windows(),
};

export const reduceItem = <T>(
	array: ReadonlyArray<T>,
	index: number,
	reducer: (value: T) => T
): T[] => [
	...array.slice(0, index),
	reducer(array[index]),
	...array.slice(index + 1),
];

export default store;
