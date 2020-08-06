import { action } from "typesafe-actions";
import * as constants from "../constants/ui";
import { DrawerTypeEnum } from "../../types/index_d";

export const setDrawerMode = (type: DrawerTypeEnum) =>
  action(constants.SET_DRAWER_MODE, { type });

export const setIsLight = (isLight: boolean) =>
  action(constants.SET_IS_LIGHT, { isLight });

export const setDrawerOpened = (open: boolean) =>
  action(constants.SET_DRAWER_OPENED, { open });
