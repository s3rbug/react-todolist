import { setUiAction, setIsLightAction } from "./../actions/ui";
import { uiApi } from "./../../api/uiApi";

export const setUi = () => async (dispatch: any) => {
	return uiApi.getUiApi().then((data) => {
		dispatch(setUiAction(data));
	});
};

export const setIsLight = (isLight: boolean) => async (dispatch: any) => {
	return uiApi.setIsLight(isLight).then((data) => {
		dispatch(setIsLightAction(isLight));
	});
};
