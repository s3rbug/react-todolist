import { action } from "typesafe-actions";
import * as constants from "../constants/ui";
import { DrawerTypeEnum } from "../../types/index_d";

export const setDrawerModeAction = (type: DrawerTypeEnum) =>
    action(constants.SET_DRAWER_MODE, { type });

export const setIsLightAction = (isLight: boolean) =>
    action(constants.SET_IS_LIGHT, { isLight });

export const setDrawerOpenedAction = (open: boolean) =>
    action(constants.SET_DRAWER_OPENED, { open });

export const setPageTitleAction = (newTitle: string) =>
    action(constants.SET_PAGE_TITLE, { newTitle });