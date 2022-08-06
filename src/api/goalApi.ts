import { FolderType, TagType, GoalType, CurrentFolderIdType } from './../types/index_d';
import { instance } from "./api";

export const goalApi = {
	async getFolders() {
		return instance.get<FolderType[]>("folders")
	},

	async getTags() {		
		return instance.get<TagType[]>("tags")
	},

	async getCurrentFolders(){
		return instance.get<CurrentFolderIdType[]>("folders/currentFolders")
	},

	async addGoal(folderId: string, text: string){
		return instance.post<GoalType>("goals", {folderId, text})
	},

	async deleteGoal(folderId: string, goalId: string){
		return instance.put<{success: boolean}>("goals/delete", {folderId, goalId})
	},

	async toggleChecked(folderId: string, goalId: string){
		return instance.put<{success: boolean}>("goals/toggle", {folderId, goalId})
	},

	async editGoal(
		folderId: string,
		goalId: string,
		newGoal: {text?: string, note?: string, tagId?: string}
		){
		return instance.put<{success: boolean}>("goals/edit", {
			folderId,
			goalId,
			...newGoal
		})
	},

	async editFolderHeadline(folderId: string, headline: string){
		return instance.put<{success: boolean}>("folders/headline", {folderId, headline})
	},

	async addFolder(headline: string){
		return instance.post<FolderType>("folders", {headline})
	},

	async addTag(name: string, color: string){
		return instance.post<TagType>("tags", {name, color})
	},

	async deleteTag(tagId: string){
		return instance.put<{success: boolean}>(`tags/${tagId}`)
	},

	async editTag(tagId: string, newTag: {name?: string, color?: string}){
		return instance.put<{success: boolean}>(`tags/edit/${tagId}`, {...newTag})
	},

	async swapGoalsDifferentFolders(fromGoalIndex: number, toGoalIndex: number, fromFolderId: string, toFolderId: string){
		return instance.put("goals/swap-goals-different-folders", {fromGoalIndex, toGoalIndex, fromFolderId, toFolderId})
	},

	async swapGoalsSameFolder(fromGoalIndex: number, toGoalIndex: number, folderId: string){
		return instance.put("goals/swap-goals-same-folder", {fromGoalIndex, toGoalIndex, folderId})
	},

	async reorderCurrentFolders(fromFolderId: string, toFolderId: string){
		return instance.put<{success: boolean}>("folders/reorder", {fromFolderId, toFolderId})
	},

	async deleteFolder(folderId: string){
		return instance.put<{success: boolean}>('folders/delete', {folderId})
	}
}
