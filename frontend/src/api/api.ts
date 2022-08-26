import { isDevelopment } from './../utils/helpers';
import axios from "axios";

export const instance = axios.create({
	baseURL: isDevelopment() ? "http://localhost:3100/" : "https://s3rbug-react-todolist.herokuapp.com/",
});


export const setApiHeader = (token: string) => {
	instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}