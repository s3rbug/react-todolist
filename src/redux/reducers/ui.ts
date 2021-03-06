import { ActionType } from "typesafe-actions";
import * as actions from "../actions/ui";
import * as constants from "./../constants/ui";
import { UiStateType } from "../../types/index_d";

const initialState = {
	isLight: true,
	isPageLoading: true,
	serverless: true,
};

export type UiAction = ActionType<typeof actions>;

const reducer = (state = initialState, action: UiAction): UiStateType => {
	switch (action.type) {
		case constants.SET_UI: {
			const { ui } = action.payload;
			return {
				...state,
				isLight: ui.isLight,
			};
		}
		case constants.SET_IS_LIGHT: {
			const { isLight } = action.payload;
			return {
				...state,
				isLight,
			};
		}
		case constants.SET_IS_LOADING: {
			const { isLoading } = action.payload;
			return {
				...state,
				isPageLoading: isLoading,
			};
		}
		case constants.SET_IS_SERVERLESS: {
			const { serverless } = action.payload;
			return {
				...state,
				serverless,
			};
		}
		case constants.LOAD_LOCAL_UI: {
			return {
				...localState,
			};
		}
		default:
			return state;
	}
};

const localState = {
	isLight: true,
	isPageLoading: true,
	serverless: true,
};

export default reducer;
