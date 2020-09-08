import { TodoStateType, FolderIdType } from "./../../types/index_d";
import { ActionType } from "typesafe-actions";
import * as actions from "../actions/todo";
import * as constants from "./../constants/todo";
import { reduceItem } from "../reduxStore";
import { TagType, FolderType } from "../../types/index_d";

const initialState = {
	folders: [] as Array<FolderType>,
	tags: [] as Array<TagType>,
	currentFolders: [] as FolderIdType[],
	arrowMoving: [] as boolean[],
} as TodoStateType;

export type TodosAction = ActionType<typeof actions>;

const reducer = (state = initialState, action: TodosAction): TodoStateType => {
	switch (action.type) {
		case constants.SET_TODO: {
			const { todo } = action.payload;
			return {
				...state,
				folders: todo.folders,
				tags: todo.tags,
				currentFolders: todo.currentFolders,
			};
		}
		case constants.TOGGLE_CHECKED: {
			const { id, folderId } = action.payload;
			return {
				...state,
				folders: reduceItem(state.folders, folderId, (folder) => {
					return {
						...folder,
						goals: folder.goals.map((goal, goalIndex) => {
							if (goalIndex === id)
								return {
									...goal,
									checked: !goal.checked,
								};
							else return goal;
						}),
					};
				}),
			};
		}
		case constants.ADD_GOAL: {
			const { text, folderId } = action.payload;
			return {
				...state,
				folders: reduceItem(state.folders, folderId, (folder) => {
					return {
						...folder,
						goals: [
							...folder.goals,
							{
								id: state.folders[folderId].goals.length,
								text: text,
								note: "",
								tag: undefined as number | undefined | null,
								checked: false,
							},
						],
					};
				}),
			};
		}
		case constants.DELETE_FOLDER: {
			const { id } = action.payload;
			return {
				...state,
				folders: state.folders
					.filter((el) => id !== el.id)
					.map((folder, i) => ({ ...folder, id: i })),
			};
		}
		case constants.DELETE_DONE: {
			const { folderId } = action.payload;
			return {
				...state,
				folders: reduceItem(state.folders, folderId, (folder) => {
					return {
						...folder,
						goals: folder.goals
							.filter((goal) => !goal.checked)
							.map((goal, i) => ({
								...goal,
								id: i,
							})),
					};
				}),
			};
		}
		case constants.ADD_FOLDER: {
			const { headline } = action.payload;
			const newFolder = {
				id: state.folders.length,
				headline: headline,
				shown: false,
				goals: [],
			};
			return {
				...state,
				folders: [...state.folders, newFolder],
			};
		}
		case constants.SWAP_TASKS: {
			let { from, to, fromFolderId, toFolderId } = action.payload;

			if (fromFolderId === toFolderId) {
				return {
					...state,
					folders: reduceItem(state.folders, fromFolderId, (folder) => ({
						...folder,
						goals: (to > from
							? [
									...folder.goals.slice(0, from),
									...folder.goals.slice(from + 1, to + 1),
									folder.goals[from],
									...folder.goals.slice(to + 1, folder.goals.length),
							  ]
							: [
									...folder.goals.slice(0, to),
									folder.goals[from],
									...folder.goals.slice(to, from),
									...folder.goals.slice(from + 1, folder.goals.length),
							  ]
						).map((goal, i) => ({
							...goal,
							id: i,
						})),
					})),
				};
			}
			return {
				...state,
				folders: state.folders.map((folder, folderId) => {
					if (folderId === fromFolderId) {
						return {
							...folder,
							goals: [
								...folder.goals.slice(0, from),
								...folder.goals.slice(from + 1, folder.goals.length),
							].map((folder, i) => ({ ...folder, id: i })),
						};
					}
					if (folderId === toFolderId) {
						return {
							...folder,
							goals: [
								...folder.goals.slice(0, to),
								state.folders[fromFolderId].goals[from],
								...folder.goals.slice(
									to,
									state.folders[toFolderId].goals.length
								),
							].map((folder, i) => ({ ...folder, id: i })),
						};
					}
					return folder;
				}),
			};
		}
		case constants.SET_GOAL: {
			const { id, newGoal, folderId } = action.payload;
			return {
				...state,
				folders: reduceItem(state.folders, folderId, (folder) => ({
					...folder,
					goals: folder.goals.map((goal, goalIdx) => {
						if (goalIdx !== id) return goal;
						return {
							...goal,
							text: newGoal,
						};
					}),
				})),
			};
		}
		case constants.DELETE_CURRENT_FOLDER: {
			const { folderId } = action.payload;
			return {
				...state,
				folders: state.folders
					.filter((folder) => folder.id !== folderId)
					.map((folder, i) => ({ ...folder, id: i })),
			};
		}
		case constants.SET_NOTE: {
			const { id, newNote, folderId } = action.payload;
			return {
				...state,
				folders: reduceItem(state.folders, folderId, (folder) => ({
					...folder,
					goals: folder.goals.map((goal, i) => {
						if (i === id) return { ...goal, note: newNote };
						else return goal;
					}),
				})),
			};
		}
		case constants.DELETE_TASK: {
			const { taskId, folderId } = action.payload;
			return {
				...state,
				folders: reduceItem(state.folders, folderId, (folder) => ({
					...folder,
					goals: folder.goals
						.filter((goal) => goal.id !== taskId)
						.map((goal, i) => ({ ...goal, id: i })),
				})),
			};
		}
		case constants.SET_TAG: {
			const { taskId, tagId, folderId } = action.payload;
			return {
				...state,
				folders: reduceItem(state.folders, folderId, (folder) => ({
					...folder,
					goals: folder.goals.map((goal) => {
						if (goal.id === taskId)
							return {
								...goal,
								tag: tagId,
							};
						else return goal;
					}),
				})),
			};
		}
		case constants.DELETE_TAG: {
			const { tagId } = action.payload;
			return {
				...state,
				folders: state.folders.map((folder) => {
					return {
						...folder,
						goals: folder.goals.map((goal) => {
							if (!goal.tag || goal.tag < tagId) return goal;
							if (goal.tag === tagId)
								return {
									...goal,
									tag: undefined as number | undefined,
								};
							if (goal.tag > tagId)
								return {
									...goal,
									tag: (goal.tag - 1) as number | undefined,
								};
							return goal;
						}),
					};
				}),
				tags: state.tags.filter((tag, id) => id !== tagId),
			};
		}
		case constants.ADD_TAG: {
			const { name, color } = action.payload;
			return {
				...state,
				tags: [
					...state.tags,
					{ id: state.tags.length, name, color } as TagType,
				],
			};
		}
		case constants.EDIT_TAG: {
			const { tagId, newName } = action.payload;
			return {
				...state,
				tags: reduceItem(state.tags, tagId, (tag) => ({
					...tag,
					name: newName,
				})),
			};
		}
		case constants.EDIT_FOLDER: {
			const { newHeadline, folderId } = action.payload;
			return {
				...state,
				folders: reduceItem(state.folders, folderId, (folder) => ({
					...folder,
					headline: newHeadline,
				})),
			};
		}
		case constants.SWAP_WITH_NOT_SHOWN: {
			const { from, folderId } = action.payload;
			return {
				...state,
				folders: state.folders.map((folder) => {
					if (folder.id === from) return { ...folder, shown: false };
					if (folder.id === folderId) return { ...folder, shown: true };
					return folder;
				}),
				currentFolders: state.currentFolders.map((currentFolder) => {
					if (currentFolder.folder === from)
						return { ...currentFolder, folder: folderId };
					return currentFolder;
				}),
			};
		}
		case constants.SWAP_CURRENT_FOLDERS: {
			const { from, to } = action.payload;
			return {
				...state,
				currentFolders: state.currentFolders.map((currentFolder) => {
					if (currentFolder.folder === from)
						return {
							...currentFolder,
							folder: to,
						};
					if (currentFolder.folder === to)
						return {
							...currentFolder,
							folder: from,
						};
					return currentFolder;
				}),
			};
		}
		case constants.SET_CURRENT_FOLDERS: {
			const { currentFolders } = action.payload;
			return {
				...state,
				folders: state.folders.map((folder) => {
					if (
						currentFolders.some(
							(currentFolder) => currentFolder.folder === folder.id
						)
					)
						return { ...folder, shown: true };
					return { ...folder, shown: false };
				}),
				currentFolders: [...currentFolders],
			};
		}
		case constants.SET_FOLDER: {
			const { folderId, newFolder } = action.payload;
			return {
				...state,
				folders: reduceItem(state.folders, folderId, (folder) => ({
					...newFolder,
				})),
			};
		}
		case constants.SET_CURRENT_FOLDER: {
			const { from, to } = action.payload;
			return {
				...state,
				currentFolders: state.currentFolders.map((current) => {
					if (current.folder === from) return { ...current, folder: to };
					return current;
				}),
			};
		}
		case constants.LOAD_LOCAL: {
			return {
				...localState,
			};
		}
		default:
			return state;
	}
};

const localState = {
	folders: [
		{
			id: 0,
			headline: "Serverless",
			shown: false,
			goals: [
				{
					id: 0,
					text: "onion",
					note: "don't forget to smile",
					tag: 1,
					checked: false,
				},
				{
					id: 1,
					text: "2",
					note: "don't forget to sing",
					tag: 1,
					checked: false,
				},
				{
					id: 2,
					text: "cucumber",
					note: "don't forget to eat",
					tag: 0,
					checked: false,
				},
				{
					id: 3,
					text: "3123",
					note: "",
					checked: false,
				},
			],
		},
		{
			id: 1,
			headline: "Local",
			shown: true,
			goals: [
				{
					id: 0,
					text: "4",
					note: "don't forget to dance",
					tag: null,
					checked: true,
				},
				{
					id: 1,
					text: "Watch 5 anime",
					note: "don't forget to chill",
					tag: 0,
					checked: false,
				},
				{
					id: 2,
					text: "Watch 7 anime",
					note: "don't forget to forget",
					tag: null,
					checked: false,
				},
				{
					id: 3,
					text: "Watch 9 anime",
					note: "don't forget to tu",
					tag: null,
					checked: false,
				},
			],
		},
		{
			id: 2,
			headline: "Storage",
			shown: true,
			goals: [
				{
					id: 0,
					text: "Watch 4 anime",
					note: "don't forget to smile",
					tag: 0,
					checked: true,
				},
				{
					id: 1,
					text: "Watch 5 anime",
					note: "don't forget to smile",
					tag: null,
					checked: false,
				},
				{
					id: 2,
					text: "Watch 7 anime",
					note: "don't forget to smile",
					tag: null,
					checked: false,
				},
			],
		},
		{
			id: 3,
			headline: "lmao",
			shown: true,
			goals: [
				{
					id: 0,
					text: "test",
					note: "don't forget to smile",
					tag: 0,
					checked: true,
				},
				{
					id: 1,
					text: "555",
					note: "don't forget to smile",
					tag: 0,
					checked: false,
				},
			],
		},
	],
	tags: [
		{
			id: 0,
			name: "important",
			color: "#FF69B4",
		},
		{
			id: 1,
			name: "work",
			color: "#0000FF",
		},
	],
	currentFolders: [
		{
			folder: 1,
			id: 0,
		},
		{
			folder: 3,
			id: 1,
		},
		{
			folder: 2,
			id: 2,
		},
	],
} as TodoStateType;

export default reducer;
