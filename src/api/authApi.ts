import { AuthFormType } from "../types/index_d";
import { instance } from "./api";

export const authApi = {
    async login(data: AuthFormType){
        return instance.post("auth/login", {...data})
    },
}