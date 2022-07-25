import { action } from 'typesafe-actions';
import * as constants from "../constants/auth"

export const setToken = (token: string) => action(constants.SET_TOKEN, {token})