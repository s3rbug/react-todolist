import { isDevelopment } from "../utils/isDevelopment"
import axios from "axios"

const getBaseURL = () => {
	if (isDevelopment()) {
		return "http://localhost:3100/"
	}
	return "https://s3rbug-react-todolist.herokuapp.com/"
}

export const instance = axios.create({
	baseURL: getBaseURL(),
})

export const setApiHeader = (token: string) => {
	instance.defaults.headers.common["Authorization"] = `Bearer ${token}`
}
