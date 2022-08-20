import axios from "axios";

export const instance = axios.create({
	baseURL: "http://localhost:3100/",
});


export const setApiHeader = (token: string) => {
	instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}