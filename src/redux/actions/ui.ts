import { UiStateType } from "./../../types/index_d";
import { action } from "typesafe-actions";
import * as constants from "../constants/ui";

export const setUiAction = (ui: UiStateType) =>
	action(constants.SET_UI, { ui });

export const setIsLightAction = (isLight: boolean) =>
	action(constants.SET_IS_LIGHT, { isLight });

export const setIsLoadingAction = (isLoading: boolean) =>
	action(constants.SET_IS_LOADING, { isLoading });

export const setIsServerlessAction = (serverless: boolean) =>
	action(constants.SET_IS_SERVERLESS, { serverless });
