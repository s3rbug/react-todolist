import { action } from "typesafe-actions";
import * as constants from "./../constants/todo";

export const toggleCheckedAction = (id: number, folderId: number) =>
	action(constants.TOGGLE_CHECKED, { id, folderId });

export const addGoalAction = (text: string, folderId: number) =>
	action(constants.ADD_GOAL, { text, folderId });

export const deleteFolderAction = (id: number) =>
	action(constants.DELETE_FOLDER, { id });

export const deleteDoneAction = (folderId: number) =>
	action(constants.DELETE_DONE, { folderId });

export const addFolderAction = (headline: string, description: string) =>
	action(constants.ADD_FOLDER, { headline, description });

export const swapTasksAction = (
	from: number,
	to: number,
	fromFolderId: number,
	toFolderId: number
) => action(constants.SWAP_TASKS, { from, to, fromFolderId, toFolderId });

export const swapFoldersAction = (from: number, to: number) =>
	action(constants.SWAP_FOLDERS, { from, to });

export const toggleEditingAction = (id: number, folderId: number) =>
	action(constants.START_EDITING, { id, folderId });

export const setGoalAction = (id: number, newGoal: string, folderId: number) =>
	action(constants.SET_GOAL, { id, newGoal, folderId });

export const deleteCurrentFolderAction = (folderId: number) =>
	action(constants.DELETE_CURRENT_FOLDER, { folderId });

export const setNoteAction = (id: number, newNote: string, folderId: number) =>
	action(constants.SET_NOTE, { id, newNote, folderId });

export const deleteTaskAction = (taskId: number, folderId: number) =>
	action(constants.DELETE_TASK, { taskId, folderId });

export const setTagAction = (taskId: number, tagId: number, folderId: number) =>
	action(constants.SET_TAG, { taskId, tagId, folderId });

export const deleteTagAction = (tagId: number) =>
	action(constants.DELETE_TAG, { tagId });

export const addTagAction = (name: string, color: string) =>
	action(constants.ADD_TAG, { name, color });

export const editTagAction = (tagId: number, newName: string) =>
	action(constants.EDIT_TAG, { tagId, newName });
