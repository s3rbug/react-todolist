export class SwapGoalsSameFolderDto {
	readonly fromGoalIndex: number
	readonly toGoalIndex: number
	readonly folderId: string
}

export class SwapGoalDifferentFolders {
	readonly fromGoalIndex: number
	readonly toGoalIndex: number
	readonly fromFolderId: string
	readonly toFolderId: string
}
