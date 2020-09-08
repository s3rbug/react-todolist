import {
	TodoStateType,
	FolderType,
	TagType,
	GoalType,
	FolderIdType,
} from "./../types/index_d";
import { instance } from "./api";

export const todoApi = {
	async getTodo() {
		return Promise.all([
			instance.get("folders"),
			instance.get("tags"),
			instance.get("currentFolders"),
		]).then((response) => {
			return {
				folders: [...response[0].data],
				tags: [...response[1].data],
				currentFolders: [...(response[2].data as FolderIdType[])],
			} as TodoStateType;
		});
	},
	async addFolder(newFolder: FolderType) {
		return instance
			.post("folders", { ...newFolder })
			.then((response) => response.data);
	},
	async addTag(newTag: TagType) {
		return instance
			.post("tags", { ...newTag })
			.then((response) => response.data);
	},
	async editTag(tagId: number, tagText: string, color: string) {
		return instance.put("tags/" + tagId, {
			id: tagId,
			name: tagText,
			color: color,
		} as TagType);
	},
	async deleteTag(tagId: number) {
		return instance.delete("tags/" + tagId);
	},
	async editFolder(oldFolder: FolderType, headline: string, folderId: number) {
		return instance.put("folders/" + folderId, { ...oldFolder, headline });
	},
	async changeGoals(
		oldFolder: FolderType,
		newGoals: GoalType[],
		folderId: number
	) {
		return instance.put("folders/" + folderId, {
			...oldFolder,
			goals: [...newGoals],
		});
	},
	async setCurrentFolder(from: number, to: number) {
		return instance.put("currentFolders/" + from, { folder: to });
	},
	async changeFolder(newFolder: FolderType, folderId: number) {
		return instance.put("folders/" + folderId, {
			...newFolder,
		});
	},
};
