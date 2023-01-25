import { goalActions } from "../redux/slices/goal";
import { uiActions } from "../redux/slices/ui";
import { authActions } from "../redux/slices/auth";

declare module "@mui/material/styles/createPalette" {
	interface Palette {
		chip: React.CSSProperties["color"];
	}
	interface PaletteOptions {
		chip: React.CSSProperties["color"];
	}
}
export type actions = typeof goalActions | typeof uiActions | typeof authActions;

export type GoalType = {
	id: string;
	text: string;
	note: string;
	tagId: string | undefined;
	checked: boolean;
};

export type FolderType = {
	id: string;
	headline: string;
	goals: Array<GoalType>;
};

export type GoalStateType = {
	folders: FolderType[];
	tags: TagType[];
	currentFolders: CurrentFolderIdType[];
};

export type UiStateType = {
	isLight: boolean;
	isPageLoading: boolean;
	showStatusAlert: boolean;
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
	id: string;
	name: string;
	color: string;
};

export type CurrentFolderIdType = string | null

export type AuthStateType = {
	token: null | string;
	username: null | string;
}

export type ObjectCssType = {
    [key: string]: {
		[key: string]: string | undefined
	} | undefined;
}

export type AuthFormType = {
    username: string;
    password: string;
    cpassword?: string;
}

export type LoginResponseType = {
	accessToken: string;
	username: string;
	expiresIn: string;
}

export type ThemeResponseType = {
	isLight: boolean;
}