import { LoginResponseType, AuthFormType } from "./../redux/types/auth"
import { instance } from "./config"

export const authApi = {
	async login(data: AuthFormType) {
		return instance.post<LoginResponseType>("auth/login", { ...data })
	},
	async register(data: AuthFormType) {
		return instance.post<LoginResponseType>("auth/register", { ...data })
	},
}
