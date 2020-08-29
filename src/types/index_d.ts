import { TodosAction } from "./../redux/reducers/todo";
import { UiAction } from "./../redux/reducers/ui";

declare module "@material-ui/core/styles/createPalette" {
	interface Palette {
		chip: React.CSSProperties["color"];
	}
	interface PaletteOptions {
		chip: React.CSSProperties["color"];
	}
}

export type GoalType = {
	id: number;
	text: string;
	note: string;
	tag: number | undefined;
	checked: boolean;
	editing: boolean;
};

export type FolderType = {
	id: number;
	headline: string;
	shown: boolean;
	goals: Array<GoalType>;
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

export enum DrawerTypeEnum {
	Menu = 1,
	Back,
}

export type TagType = {
	name: string;
	color: string;
};

export type MyActionType = UiAction | TodosAction;
