export type GoalStateType = {
	folders: FolderType[]
	tags: TagType[]
	currentFolders: CurrentFolderIdType[]
}

export type GoalType = {
	id: string
	text: string
	note: string
	tagId: string | undefined
	checked: boolean
}

export type FolderType = {
	id: string
	headline: string
	goals: Array<GoalType>
}

export type CurrentFolderIdType = string | null

export type TagType = {
	id: string
	name: string
	color: string
}

export type FolderFormDataType = {
	headline: string
	description: string
}

export type TaskFormDataType = {
	goalText: string
}

export type TaskDetailsFormType = {
	goalText: string
	noteText: string
}
