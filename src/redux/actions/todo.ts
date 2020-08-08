import { action } from "typesafe-actions";
import * as constants from "./../constants/todo";

export const setCurrentFolderByIdAction = (id: number) =>
  action(constants.SET_CURRENT_FOLDER, { id });

export const toggleCheckedAction = (id: number) =>
  action(constants.TOGGLE_CHECKED, { id });

export const addGoalAction = (text: string) =>
  action(constants.ADD_GOAL, { text });

export const deleteFolderAction = (id: number) =>
  action(constants.DELETE_FOLDER, { id });

export const deleteDoneAction = () => action(constants.DELETE_DONE);

export const addFolderAction = (headline: string, description: string) =>
  action(constants.ADD_FOLDER, { headline, description });

export const swapTasksAction = (from: number, to: number) =>
  action(constants.SWAP_TASKS, { from, to });

export const swapFoldersAction = (from: number, to: number) =>
  action(constants.SWAP_FOLDERS, { from, to });

export const stopEditingAction = () => action(constants.STOP_EDITING);

export const toggleEditingAction = (id: number) =>
  action(constants.START_EDITING, { id });

export const setGoalAction = (id: number, newGoal: string) =>
  action(constants.SET_GOAL, { id, newGoal });
