import { GoalStateType, TagType, FolderType, CurrentFolderIdType, GoalType } from './../../types/index_d';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: GoalStateType = {
	folders: [] as FolderType[],
	tags: [] as TagType[],
	currentFolders: [] as CurrentFolderIdType[],
};

const reduceGoal = (
    folders: FolderType[], 
    folderId: string, 
    goalId: string,
    reducer: (goal: GoalType) => GoalType
) => {
    return [...folders.map(folder => {
        if(folder.id === folderId){
            return {
                ...folder,
                goals: folder.goals.map(goal => {
                    if(goal.id === goalId){
                        return {...reducer(goal)}
                    }
                    else{
                        return {...goal}
                    }
                })
            }
        }
        else{
            return {...folder}
        }
    })
    ]
}

const goalSlice = createSlice({
    name: 'goal',
    initialState,
    reducers: {
        setUserData: (state: GoalStateType, action: PayloadAction<{folders?: FolderType[], tags?: TagType[], currentFolders?: CurrentFolderIdType[]}>) => {
            const {folders, tags, currentFolders} = action.payload
            if(folders){
                state.folders = folders 
            }
            if(tags){
                state.tags = tags
            }
            if(currentFolders){
                state.currentFolders = currentFolders
            }
        },
        editGoal: (state: GoalStateType, action: PayloadAction<{folderId: string, goalId: string, newGoal: {note?: string, tagId?: string, text?: string}}>) => {
            const {folderId, goalId, newGoal} = action.payload
            
            return {
                ...state,
                folders: reduceGoal(state.folders, folderId, goalId, goal => ({
                    ...goal,
                    text: newGoal.text || goal.text,
                    note: newGoal.note || goal.note,
                    tagId: newGoal.tagId || goal.tagId
                }))
            }
        },
        toggleChecked: (state, action: PayloadAction<{folderId: string, goalId: string}>) => {
            const {folderId, goalId} = action.payload

            return {
                ...state,
                folders: reduceGoal(state.folders, folderId, goalId, goal => ({
                    ...goal,
                    checked: !goal.checked
                }))
            }
        },
        addGoal: (state, action: PayloadAction<{text: string, folderId: string, newGoalId: string}>) => {
            const {text, folderId, newGoalId} = action.payload
            const folderIndex = state.folders.findIndex(folder => folder.id === folderId)
            if(folderIndex !== -1){
                state.folders[folderIndex].goals.push({
                    id: newGoalId,
                    text: text,
                    checked: false,
                    note: "",
                    tagId: undefined
                })
            }
        },
        deleteGoal: (state, action: PayloadAction<{goalId: string, folderId: string}>) => {
            const {goalId, folderId} = action.payload
            const folderIndex = state.folders.findIndex(folder => folder.id === folderId)
            if(folderIndex !== -1){
                state.folders[folderIndex].goals = state.folders[folderIndex].goals.filter(goal => goal.id !== goalId)
            }
        },
        editFolderHeadline: (state, action: PayloadAction<{folderId: string, headline: string}>) => {
            const {folderId, headline} = action.payload
            const folderIndex = state.folders.findIndex(folder => folder.id === folderId)
            if(folderIndex !== -1){
                state.folders[folderIndex].headline = headline
            }
        },
        addFolder: (state, action: PayloadAction<{newFolder: FolderType}>) => {
            const {newFolder} = action.payload
            if(state.currentFolders.includes(null)){
                const index = state.currentFolders.findIndex(currentFolderId => currentFolderId === null)
                state.currentFolders[index] = newFolder.id
            }
            state.folders.push(newFolder)
        },
        addTag: (state, action: PayloadAction<{newTag: TagType}>) => {
            const {newTag} = action.payload
            state.tags.push(newTag)
        },
        deleteTag: (state, action: PayloadAction<{tagId: string}>) => {
            const {tagId} = action.payload
            return {
				...state,
				tags: state.tags.filter(tag => tag.id !== tagId),
				folders: [
					...state.folders.map(folder => ({
						...folder,
						goals: folder.goals.map(goal => {
							if(goal.tagId === tagId){
								return {
									...goal,
									tagId: undefined
								}
							}
							else{
								return {...goal}
							}
						})
					}))
				]
			}
        },
        editTag: (state, action: PayloadAction<{tagId: string, newTag: {
            name?: string | undefined;
            color?: string | undefined;
        }}>) => {
            const {tagId, newTag} = action.payload
            const tagIndex = state.tags.findIndex(tag => tag.id === tagId)
            if(tagIndex !== -1){
                if(newTag.color){
                    state.tags[tagIndex].color = newTag.color
                }
                if(newTag.name){
                    state.tags[tagIndex].name = newTag.name
                }
            }
        },
        swapGoalsDifferentFolders: (state, action: PayloadAction<{fromGoalIndex: number, toGoalIndex: number, fromFolderId: string, toFolderId: string}>) => {
            const {fromFolderId, toFolderId, fromGoalIndex, toGoalIndex} = action.payload
            const fromFolderIndex = state.folders.findIndex(folder => folder.id === fromFolderId)
            const toFolderIndex = state.folders.findIndex(folder => folder.id === toFolderId)
            if(fromFolderIndex !== -1 && toFolderIndex !== -1){
                const [removed] = state.folders[fromFolderIndex].goals.splice(fromGoalIndex, 1)
                state.folders[toFolderIndex].goals.splice(toGoalIndex, 0, removed)
            }
        },

        swapGoalsSameFolder: (state, action: PayloadAction<{fromGoalIndex: number, toGoalIndex: number, folderId: string}>) => {
            const {folderId, fromGoalIndex, toGoalIndex} = action.payload            
            const folderIndex = state.folders.findIndex(folder => folder.id === folderId)
            if(folderIndex !== -1){                
                const [removed] = state.folders[folderIndex].goals.splice(fromGoalIndex, 1)
                state.folders[folderIndex].goals.splice(toGoalIndex, 0, removed)
            }
        },
        reorderCurrentFolders: (state, action: PayloadAction<{fromFolderId: string, toFolderId: string}>) => {
            const {fromFolderId, toFolderId} = action.payload
            const bothShown = state.currentFolders.includes(toFolderId)
            return {
				...state,
				currentFolders: state.currentFolders.map(currentFolderId => {
					if(currentFolderId === fromFolderId){
						return toFolderId
					}
					else if(bothShown && currentFolderId === toFolderId){
						return fromFolderId
					}
					else{
						return currentFolderId
					}
				})
			}
        },
        deleteFolder: (state, action: PayloadAction<{folderId: string}>) => {
            const {folderId} = action.payload
            const hiddenFolders = state.folders.filter(folder => !state.currentFolders.includes(folder.id))
            if(state.currentFolders.includes(folderId)){
                const deletedFolderIndex = state.currentFolders.findIndex(currentFolderId => currentFolderId === folderId)
                if(hiddenFolders.length > 0) {
                    state.currentFolders[deletedFolderIndex] = hiddenFolders[0].id
                }
            }
            state.folders = state.folders.filter(folder => folder.id !== folderId)
        },
    }
})

export const goalActions = goalSlice.actions

export default goalSlice.reducer