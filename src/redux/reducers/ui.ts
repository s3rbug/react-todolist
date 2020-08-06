import { DrawerTypeEnum } from "./../../types/index_d";
import { ActionType } from "typesafe-actions";
import * as actions from "../actions/ui";
import * as constants from "./../constants/ui";

const initialState = {
  drawerMode: DrawerTypeEnum.Menu,
  isLight: true,
  drawerOpened: false,
};

export type TodosAction = ActionType<typeof actions>;
type StateType = typeof initialState;

const reducer = (state = initialState, action: TodosAction): StateType => {
  switch (action.type) {
    case constants.SET_DRAWER_MODE: {
      const { type } = action.payload;
      let stateCopy = { ...state };
      stateCopy.drawerMode = type;
      return { ...stateCopy };
    }
    case constants.SET_IS_LIGHT: {
      const { isLight } = action.payload;
      let stateCopy = { ...state };
      stateCopy.isLight = isLight;
      return { ...stateCopy };
    }
    case constants.SET_DRAWER_OPENED: {
      const { open } = action.payload;
      let stateCopy = { ...state };
      stateCopy.drawerOpened = open;
      return { ...stateCopy };
    }
    default:
      return state;
  }
};

export default reducer;
