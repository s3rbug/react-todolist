export type GoalType = {
    id: number;
    text: string;
    checked: boolean;
    editing: boolean;
};

export type FolderType = {
    id: number;
    headline: string;
    description: string;
    goals: Array<GoalType>;
};

export type FolderFormDataType = {
    headline: string;
    description: string;
};

export type TaskFormDataType = {
    goalText: string;
};

export enum DrawerTypeEnum {
    Menu = 1,
    Back,
}
