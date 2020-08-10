import { DrawerTypeEnum } from "./../../types/index_d";
import { ActionType } from "typesafe-actions";
import * as actions from "../actions/ui";
import * as constants from "./../constants/ui";

const initialState = {
    drawerMode: DrawerTypeEnum.Menu,
    isLight: true,
    drawerOpened: false,
    pageTitle: "To do list",
};

export type UiAction = ActionType<typeof actions>;
type StateType = typeof initialState;

const reducer = (state = initialState, action: UiAction): StateType => {
    switch (action.type) {
        case constants.SET_DRAWER_MODE: {
            const { type } = action.payload;
            return {
                ...state,
                drawerMode: type,
            };
        }
        case constants.SET_IS_LIGHT: {
            const { isLight } = action.payload;
            return {
                ...state,
                isLight,
            };
        }
        case constants.SET_DRAWER_OPENED: {
            const { open } = action.payload;
            return {
                ...state,
                drawerOpened: open,
            };
        }
        case constants.SET_PAGE_TITLE: {
            const { newTitle } = action.payload;
            return {
                ...state,
                pageTitle: newTitle,
            };
        }
        default:
            return state;
    }
};

export default reducer;
