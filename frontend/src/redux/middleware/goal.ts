import { AppThunkType } from "../store"
import {
	localStorageWrapper,
	LOCAL_STORAGE_KEY,
} from "../../utils/localStorageWrapper"
import { setApiHeader } from "../../api/config"
import { authActions } from "./../slices/auth"
import { goalActions } from "./../slices/goal"
import { goalApi } from "../../api/goalApi"
import { uiActions } from "../slices/ui"

export const setUserData = (): AppThunkType => async (dispatch) => {
	return Promise.all([
		goalApi.getFolders(),
		goalApi.getTags(),
		goalApi.getCurrentFolders(),
	])
		.then((response) => {
			const isResponseOk = !response.some((res) => res.status !== 200)

			if (isResponseOk) {
				dispatch(
					goalActions.setUserData({
						folders: response[0].data,
						tags: response[1].data,
						currentFolders: response[2].data,
					})
				)
			}
		})
		.catch(() => {
			setApiHeader("")
			localStorageWrapper.setLocalStorageItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN, {
				username: null,
				accessToken: null,
			})
			dispatch(authActions.resetUser())
		})
		.finally(() => {
			dispatch(uiActions.setIsLoading({ isLoading: false }))
		})
}

type AddGoalType = {
	folderId: string
	text: string
}

export const addGoal =
	({ folderId, text }: AddGoalType): AppThunkType =>
	async (dispatch) => {
		return goalApi.addGoal(folderId, text).then((response) => {
			if (response.status === 201) {
				const newGoal = response.data
				dispatch(
					goalActions.addGoal({
						folderId,
						text: newGoal.text,
						newGoalId: newGoal.id,
					})
				)
			}
		})
	}

type DeleteGoalType = {
	folderId: string
	goalId: string
}

export const deleteGoal =
	({ folderId, goalId }: DeleteGoalType): AppThunkType<Promise<void>> =>
	async (dispatch) => {
		return goalApi.deleteGoal(folderId, goalId).then((response) => {
			if (response.status === 200) {
				dispatch(goalActions.deleteGoal({ goalId, folderId }))
			}
		})
	}

type EditGoalType = {
	folderId: string
	goalId: string
	newGoal: { note?: string; tagId?: string; text?: string }
}

export const editGoal =
	({ folderId, goalId, newGoal }: EditGoalType): AppThunkType =>
	async (dispatch) => {
		return goalApi.editGoal(folderId, goalId, newGoal).then((response) => {
			if (response.status === 200) {
				dispatch(goalActions.editGoal({ folderId, goalId, newGoal }))
			}
		})
	}

type ToggleCheckedType = {
	folderId: string
	goalId: string
}

export const toggleChecked =
	({ folderId, goalId }: ToggleCheckedType): AppThunkType =>
	async (dispatch) => {
		return goalApi.toggleChecked(folderId, goalId).then((response) => {
			if (response.status === 200) {
				dispatch(goalActions.toggleChecked({ folderId, goalId }))
			}
		})
	}

type EditFolderHeadlineType = {
	folderId: string
	headline: string
}

export const editFolderHeadline =
	({ folderId, headline }: EditFolderHeadlineType): AppThunkType =>
	async (dispatch) => {
		return goalApi.editFolderHeadline(folderId, headline).then((response) => {
			if (response.status === 200) {
				dispatch(goalActions.editFolderHeadline({ folderId, headline }))
			}
		})
	}

type AddFolderType = {
	headline: string
}

export const addFolder =
	({ headline }: AddFolderType): AppThunkType =>
	async (dispatch) => {
		return goalApi.addFolder(headline).then((response) => {
			if (response.status === 201) {
				dispatch(goalActions.addFolder({ newFolder: response.data }))
			}
		})
	}

type AddTagType = {
	name: string
	color: string
}

export const addTag =
	({ name, color }: AddTagType): AppThunkType =>
	async (dispatch) => {
		return goalApi.addTag(name, color).then((response) => {
			if (response.status === 201) {
				dispatch(goalActions.addTag({ newTag: response.data }))
			}
		})
	}

type DeleteTagType = {
	tagId: string
}

export const deleteTag =
	({ tagId }: DeleteTagType): AppThunkType =>
	async (dispatch) => {
		return goalApi.deleteTag(tagId).then((response) => {
			if (response.status === 200) {
				dispatch(goalActions.deleteTag({ tagId }))
			}
		})
	}

type EditTagType = {
	tagId: string
	newTag: { name?: string; color?: string }
}

export const editTag =
	({ tagId, newTag }: EditTagType): AppThunkType =>
	async (dispatch) => {
		return goalApi.editTag(tagId, newTag).then((response) => {
			if (response.status === 200) {
				dispatch(goalActions.editTag({ tagId, newTag }))
			}
		})
	}

type SwapGoalsDifferentFoldersType = {
	fromGoalIndex: number
	toGoalIndex: number
	fromFolderId: string
	toFolderId: string
}

export const swapGoalsDifferentFolders =
	({
		fromGoalIndex,
		toGoalIndex,
		fromFolderId,
		toFolderId,
	}: SwapGoalsDifferentFoldersType): AppThunkType =>
	async (dispatch) => {
		return goalApi
			.swapGoalsDifferentFolders(
				fromGoalIndex,
				toGoalIndex,
				fromFolderId,
				toFolderId
			)
			.then(() => {
				dispatch(uiActions.setIsLoading({ isLoading: false }))
			})
	}

type SwapGoalsSameFolderType = {
	fromGoalIndex: number
	toGoalIndex: number
	folderId: string
}

export const swapGoalsSameFolder =
	({
		fromGoalIndex,
		toGoalIndex,
		folderId,
	}: SwapGoalsSameFolderType): AppThunkType =>
	async (dispatch) => {
		return goalApi
			.swapGoalsSameFolder(fromGoalIndex, toGoalIndex, folderId)
			.then(() => {
				dispatch(uiActions.setIsLoading({ isLoading: false }))
			})
	}

type ReorderCurrentFoldersType = {
	fromFolderId: string
	toFolderId: string
}

export const reorderCurrentFolders =
	({ fromFolderId, toFolderId }: ReorderCurrentFoldersType): AppThunkType =>
	async (dispatch) => {
		return goalApi
			.reorderCurrentFolders(fromFolderId, toFolderId)
			.then((response) => {
				if (response.status === 200) {
					dispatch(
						goalActions.reorderCurrentFolders({ fromFolderId, toFolderId })
					)
				}
			})
			.then(() => {
				dispatch(uiActions.setIsLoading({ isLoading: false }))
			})
	}

type DeleteFolderType = {
	folderId: string
}

export const deleteFolder =
	({ folderId }: DeleteFolderType): AppThunkType =>
	async (dispatch) => {
		return goalApi.deleteFolder(folderId).then((response) => {
			if (response.status === 200) {
				console.log(folderId)
				dispatch(goalActions.deleteFolder({ folderId }))
			}
		})
	}
