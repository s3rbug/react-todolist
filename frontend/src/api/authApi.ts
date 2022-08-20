import { LoginResponseType } from './../types/index_d';
import { AuthFormType } from "../types/index_d";
import { instance } from "./api";

export const authApi = {
    async login(data: AuthFormType){
        return instance.post<LoginResponseType>("auth/login", {...data})
    },
    async register(data: AuthFormType){
        return instance.post<LoginResponseType>("auth/register", {...data})
    }
}