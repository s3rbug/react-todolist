import { action } from "typesafe-actions";
import * as constants from "./../constants/todo";

export const setCurrentFolderById = (id: number) =>
  action(constants.SET_CURRENT_FOLDER, { id });

export const toggleChecked = (id: number) =>
  action(constants.TOGGLE_CHECKED, { id });

export const addGoal = (text: string) => action(constants.ADD_GOAL, { text });

export const deleteFolder = (id: number) =>
  action(constants.DELETE_FOLDER, { id });

export const deleteDone = () => action(constants.DELETE_DONE);

export const addFolder = (headline: string, description: string) =>
  action(constants.ADD_FOLDER, { headline, description });

export const swapTasks = (from: number, to: number) =>
  action(constants.SWAP_TASKS, { from, to });

export const swapFolders = (from: number, to: number) =>
  action(constants.SWAP_FOLDERS, { from, to });
