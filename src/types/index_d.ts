export type GoalType = {
  id: number;
  text: string;
  checked: boolean;
};

export type FolderType = {
  id: number;
  headline: string;
  description: string;
  goals: Array<GoalType>;
};

export type FormDataType = {
  headline: string;
  description: string;
};
