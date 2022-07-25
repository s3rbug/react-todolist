import { ThunkDispatch } from "redux-thunk";
import { AppStateType } from "./../redux/reduxStore";
import { ActionType } from "typesafe-actions";
import { TodosAction } from "./../redux/reducers/todo";
import { UiAction } from "./../redux/reducers/ui";
import * as todoActions from "../redux/actions/todo";
import * as uiActions from "../redux/actions/ui";

declare module "@material-ui/core/styles/createPalette" {
	interface Palette {
		chip: React.CSSProperties["color"];
	}
	interface PaletteOptions {
		chip: React.CSSProperties["color"];
	}
}
export type actions = typeof todoActions | typeof uiActions;
export type ActionsType = ActionType<actions>;
export type ThunkDispatchType = ThunkDispatch<AppStateType, void, ActionsType>;

export type GoalType = {
	id: number;
	text: string;
	note: string;
	tag: number | undefined | null;
	checked: boolean;
};

export type FolderType = {
	id: number;
	headline: string;
	shown: boolean;
	goals: Array<GoalType>;
};

export type TodoStateType = {
	folders: FolderType[];
	tags: TagType[];
	currentFolders: FolderIdType[];
};

export type UiStateType = {
	isLight: boolean;
	isPageLoading: boolean;
	serverless: boolean;
};

export type FolderFormDataType = {
	headline: string;
	description: string;
};

export type TaskFormDataType = {
	goalText: string;
};

export type TaskDetailsFormType = {
	goalText: string;
	noteText: string;
};

export type TagType = {
	id: number;
	name: string;
	color: string;
};

export type FolderIdType = {
	id: number;
	folder: number;
};

export type MyActionType = UiAction | TodosAction;

export type AuthStateType = {
	token: null | string;
}

export type ObjectCssType = {
    [key: string]: {
		[key: string]: string | undefined
	} | undefined;
}