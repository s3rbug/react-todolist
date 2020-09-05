import axios from "axios";

export const instance = axios.create({
	withCredentials: true,
	baseURL: "http://192.168.0.11:3001/",
});
