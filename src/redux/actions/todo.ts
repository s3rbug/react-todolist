import { FolderType, FolderIdType } from "./../../types/index_d";
import { TodoStateType } from "../../types/index_d";
import { action } from "typesafe-actions";
import * as constants from "./../constants/todo";

export const setTodoAction = (todo: TodoStateType) =>
	action(constants.SET_TODO, { todo });

export const toggleCheckedAction = (id: number, folderId: number) =>
	action(constants.TOGGLE_CHECKED, { id, folderId });

export const addGoalAction = (text: string, folderId: number) =>
	action(constants.ADD_GOAL, { text, folderId });

export const deleteFolderAction = (id: number) =>
	action(constants.DELETE_FOLDER, { id });

export const deleteDoneAction = (folderId: number) =>
	action(constants.DELETE_DONE, { folderId });

export const addFolderAction = (headline: string) =>
	action(constants.ADD_FOLDER, { headline });

export const swapTasksAction = (
	from: number,
	to: number,
	fromFolderId: number,
	toFolderId: number
) => action(constants.SWAP_TASKS, { from, to, fromFolderId, toFolderId });

export const setGoalAction = (id: number, newGoal: string, folderId: number) =>
	action(constants.SET_GOAL, { id, newGoal, folderId });

export const deleteCurrentFolderAction = (folderId: number) =>
	action(constants.DELETE_CURRENT_FOLDER, { folderId });

export const setNoteAction = (id: number, newNote: string, folderId: number) =>
	action(constants.SET_NOTE, { id, newNote, folderId });

export const deleteTaskAction = (taskId: number, folderId: number) =>
	action(constants.DELETE_TASK, { taskId, folderId });

export const setTagAction = (
	taskId: number,
	tagId: number | undefined | null,
	folderId: number
) => action(constants.SET_TAG, { taskId, tagId, folderId });

export const deleteTagAction = (tagId: number) =>
	action(constants.DELETE_TAG, { tagId });

export const addTagAction = (name: string, color: string) =>
	action(constants.ADD_TAG, { name, color });

export const editTagAction = (tagId: number, newName: string) =>
	action(constants.EDIT_TAG, { tagId, newName });

export const editFolderAction = (newHeadline: string, folderId: number) =>
	action(constants.EDIT_FOLDER, { newHeadline, folderId });

export const swapWithNotShownAction = (from: number, folderId: number) =>
	action(constants.SWAP_WITH_NOT_SHOWN, { from, folderId });

export const swapCurrentFoldersAction = (from: number, to: number) =>
	action(constants.SWAP_CURRENT_FOLDERS, { from, to });

export const setCurrentFoldersAction = (currentFolders: FolderIdType[]) =>
	action(constants.SET_CURRENT_FOLDERS, { currentFolders });

export const setFolderAction = (newFolder: FolderType, folderId: number) =>
	action(constants.SET_FOLDER, { newFolder, folderId });

export const setCurrentFolderAction = (from: number, to: number) =>
	action(constants.SET_CURRENT_FOLDER, { from, to });

export const loadLocalAction = () => action(constants.LOAD_LOCAL);
