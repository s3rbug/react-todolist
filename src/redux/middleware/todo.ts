import { AppStateType } from "./../reduxStore";
import {
	FolderType,
	TagType,
	GoalType,
	ThunkDispatchType,
} from "./../../types/index_d";
import { setIsLoadingAction } from "./../actions/ui";
import {
	setTodoAction,
	addFolderAction,
	addTagAction,
	editTagAction,
	editFolderAction,
	addGoalAction,
	setTagAction,
	setGoalAction,
	setNoteAction,
	toggleCheckedAction,
	swapCurrentFoldersAction,
	swapWithNotShownAction,
} from "./../actions/todo";
import { todoApi } from "./../../api/todoApi";

export const setTodo = () => async (dispatch: ThunkDispatchType) => {
	return todoApi.getTodo().then((data) => {
		dispatch(setIsLoadingAction(false));
		dispatch(setTodoAction(data));
	});
};

export const addFolder = (newFolder: FolderType) => async (
	dispatch: ThunkDispatchType
) => {
	return todoApi.addFolder(newFolder).then((data) => {
		dispatch(addFolderAction(newFolder.headline));
	});
};

export const addTag = (
	tagName: string,
	tagColor: string,
	tagId: number
) => async (dispatch: ThunkDispatchType) => {
	return todoApi
		.addTag({ id: tagId, name: tagName, color: tagColor } as TagType)
		.then((data) => {
			dispatch(addTagAction(tagName, tagColor));
		});
};

export const editTag = (
	tagId: number,
	tagText: string,
	color: string
) => async (dispatch: ThunkDispatchType) => {
	return todoApi.editTag(tagId, tagText, color).then((data) => {
		dispatch(editTagAction(tagId, tagText));
	});
};

export const editFolder = (
	oldFolder: FolderType,
	headline: string,
	folderId: number
) => async (dispatch: ThunkDispatchType) => {
	return todoApi.editFolder(oldFolder, headline, folderId).then((data) => {
		dispatch(editFolderAction(headline, folderId));
	});
};

export const addGoal = (goalText: string, folderId: number) => async (
	dispatch: ThunkDispatchType,
	getState: () => AppStateType
) => {
	const goals = getState().todo.folders[folderId].goals;
	const newGoals = [
		...goals,
		{
			id: goals.length,
			text: goalText,
			tag: null,
			checked: false,
			note: "",
		},
	] as GoalType[];
	return todoApi
		.changeGoals(getState().todo.folders[folderId], newGoals, folderId)
		.then((data) => {
			dispatch(addGoalAction(newGoals[newGoals.length - 1].text, folderId));
		});
};

export const saveTaskDetails = (
	goalId: number,
	newText: string,
	newNote: string,
	tagId: number | null | undefined,
	folderId: number
) => async (dispatch: ThunkDispatchType, getState: () => AppStateType) => {
	const goals = getState().todo.folders[folderId].goals;
	const newGoals = goals.map((goal) => {
		if (goal.id === goalId)
			return {
				...goal,
				text: newText,
				tag: tagId,
				note: newNote,
			};
		return goal;
	});
	return todoApi
		.changeGoals(getState().todo.folders[folderId], newGoals, folderId)
		.then((data) => {
			dispatch(setGoalAction(goalId, newText, folderId));
			dispatch(setNoteAction(goalId, newNote, folderId));
			dispatch(setTagAction(goalId, tagId, folderId));
		});
};

export const toggleChecked = (goalId: number, folderId: number) => async (
	dispatch: ThunkDispatchType,
	getState: () => AppStateType
) => {
	const goals = getState().todo.folders[folderId].goals;
	const newGoals = goals.map((goal) => {
		if (goal.id === goalId)
			return {
				...goal,
				checked: !goal.checked,
			};
		return goal;
	});

	return todoApi
		.changeGoals(getState().todo.folders[folderId], newGoals, folderId)
		.then((data) => {
			dispatch(toggleCheckedAction(goalId, folderId));
		});
};

export const swapCurrentFolders = (
	from: number,
	to: number,
	valueFrom: number,
	valueTo: number
) => async (dispatch: ThunkDispatchType) => {
	return Promise.all([
		todoApi.setCurrentFolder(from, valueFrom),
		todoApi.setCurrentFolder(to, valueTo),
	]).then((data) => {
		dispatch(swapCurrentFoldersAction(valueFrom, valueTo));
	});
};

export const swapWithNotShown = (
	shownId: number,
	toShowId: number,
	pos: number
) => async (dispatch: ThunkDispatchType, getState: () => AppStateType) => {
	const newShownFolder = { ...getState().todo.folders[shownId], shown: false };
	const newToShowFolder = { ...getState().todo.folders[toShowId], shown: true };
	return Promise.all([
		todoApi.changeFolder(newShownFolder, shownId),
		todoApi.changeFolder(newToShowFolder, toShowId),
		todoApi.setCurrentFolder(pos, toShowId),
	]).then((data) => {
		dispatch(swapWithNotShownAction(shownId, toShowId));
	});
};
