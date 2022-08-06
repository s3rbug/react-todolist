import { AppThunkType } from './../reduxStore';
import { localStorageWrapper } from './../../localStorage/localStorageWrapper';
import { setApiHeader } from './../../api/api';
import {authActions} from './../slices/auth';
import {goalActions} from './../slices/goal';
import { goalApi } from "../../api/goalApi";
import { uiActions } from '../slices/ui';

export const setUserData = (): AppThunkType => 
	async (dispatch) => {
		return Promise.all([
			goalApi.getFolders(), 
			goalApi.getTags(),
			goalApi.getCurrentFolders()
		])
			.then(response => {
				const isResponseOk = !response.some(res => res.status !== 200)
				
				if(isResponseOk){
					const folders = response[0].data
					const tags = response[1].data
					const currentFolders = response[2].data					
					dispatch(goalActions.setUserData({folders, tags, currentFolders}))
				}
			})
			.catch(() => {
				setApiHeader("")
				localStorageWrapper.setLocalStorageItem("token", {
					username: null,
					accessToken: null
				})
				dispatch(authActions.resetUser())
			})
			.finally(() => {
				dispatch(uiActions.setIsLoading({isLoading: false}))
			})
}

export const addGoal = (
	folderId: string, 
	text: string
) : AppThunkType => async (dispatch) => {
	return goalApi.addGoal(folderId, text).then(response => {
		if(response.status === 201){
			const newGoal = response.data
			dispatch(goalActions.addGoal({folderId, text: newGoal.text, newGoalId: newGoal.id}))
		}
	})
}

export const deleteGoal = (
	folderId: string, 
	goalId: string
) : AppThunkType<Promise<void>> => async (dispatch) => {
	return goalApi.deleteGoal(folderId, goalId).then(response => {
		if(response.status === 200 && response.data?.success){
			dispatch(goalActions.deleteGoal({goalId, folderId}))
		}
	})
}

export const editGoal = (
	folderId: string, 
	goalId: string, 
	newGoal: {note?: string, tagId?: string, text?: string}
): AppThunkType => async (dispatch) => {
	return goalApi.editGoal(folderId, goalId, newGoal).then(response => {
		if(response.status === 200 && response.data?.success){
			dispatch(goalActions.editGoal({folderId, goalId, newGoal}))
		}
	})
}

export const toggleChecked = (
	folderId: string, 
	goalId: string
): AppThunkType => async (dispatch) => {
	return goalApi.toggleChecked(folderId, goalId).then(response => {
		if(response.status === 200 && response.data?.success){
			dispatch(goalActions.toggleChecked({folderId, goalId}))
		}
	})
}

export const editFolderHeadline = (
	folderId: string, 
	headline: string
): AppThunkType => async (dispatch) => {
	return goalApi.editFolderHeadline(folderId, headline).then(response => {
		if(response.status === 200 && response.data?.success){
			dispatch(goalActions.editFolderHeadline({folderId, headline}))
		}
	})
}

export const addFolder = (
	headline: string
): AppThunkType => async (dispatch) => {
	return goalApi.addFolder(headline).then(response => {
		if(response.status === 201){
			dispatch(goalActions.addFolder({newFolder: response.data}))
		}
	})
}

export const addTag = (
	name: string, 
	color: string
): AppThunkType => async (dispatch) => {
	return goalApi.addTag(name, color).then(response => {
		if(response.status === 201){		
			dispatch(goalActions.addTag({newTag: response.data}))
		}
	})
}

export const deleteTag = (
	tagId: string
): AppThunkType => async (dispatch) => {
	return goalApi.deleteTag(tagId).then(response => {
		if(response.status === 200 && response.data?.success){
			dispatch(goalActions.deleteTag({tagId}))		
		}
	})
}

export const editTag = (
	tagId: string, 
	newTag: {name?: string, color?: string}
): AppThunkType => async (dispatch) => {
	return goalApi.editTag(tagId, newTag).then(response => {
		if(response.status === 200 && response.data?.success){
			dispatch(goalActions.editTag({tagId, newTag}))	
		}
	})
}

export const swapGoalsDifferentFolders = (
		fromGoalIndex: number, 
		toGoalIndex: number, 
		fromFolderId: string, 
		toFolderId: string
): AppThunkType => async (dispatch) => {
	return goalApi.swapGoalsDifferentFolders(fromGoalIndex, toGoalIndex, fromFolderId, toFolderId)
		.then(() => {
			dispatch(uiActions.setIsLoading({isLoading: false}))
		})
}

export const swapGoalsSameFolder = (
	fromGoalIndex: number, 
	toGoalIndex: number, 
	folderId: string
): AppThunkType => async (dispatch) => {
	return goalApi.swapGoalsSameFolder(fromGoalIndex, toGoalIndex, folderId)
		.then(() => {
			dispatch(uiActions.setIsLoading({isLoading: false}))
		})
}

export const reorderCurrentFolders = (
	fromFolderId: string,
	toFolderId: string
): AppThunkType => async (dispatch) => {
	return goalApi.reorderCurrentFolders(fromFolderId, toFolderId)
		.then(response => {
			if(response.status === 200 && response.data.success){
				dispatch(goalActions.reorderCurrentFolders({fromFolderId, toFolderId}))
			}
		})
		.then(() => {
			dispatch(uiActions.setIsLoading({isLoading: false}))
		})
}

export const deleteFolder = (
	folderId: string
): AppThunkType => async (dispatch) => {
	return goalApi.deleteFolder(folderId)
		.then(response => {
			if(response.status === 200 && response.data.success){
				dispatch(goalActions.deleteFolder({folderId}))
			}
		})
}