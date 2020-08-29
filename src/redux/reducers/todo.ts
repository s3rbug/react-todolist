import { setDrawerModeAction } from "./../actions/ui";
import { ActionType } from "typesafe-actions";
import * as actions from "../actions/todo";
import * as constants from "./../constants/todo";
import { reduceItem } from "../reduxStore";
import { TagType } from "../../types/index_d";

const initialState = {
	folders: [
		{
			id: 0,
			headline: "Purchasing",
			shown: true,
			goals: [
				{
					id: 0,
					text: "onion",
					note: "don't forget to smile",
					tag: undefined as undefined | number,
					checked: true,
					editing: false,
				},
				{
					id: 1,
					text: "carrot",
					note: "don't forget to smile",
					tag: undefined as undefined | number,
					checked: false,
					editing: false,
				},
				{
					id: 2,
					text: "cucumber",
					note: "don't forget to smile",
					tag: undefined as undefined | number,
					checked: false,
					editing: false,
				},
			],
		},
		{
			id: 1,
			headline: "Goals",
			shown: true,
			goals: [
				{
					id: 0,
					text: "Watch 4 anime",
					note: "don't forget to smile",
					tag: undefined as undefined | number,
					checked: true,
					editing: false,
				},
				{
					id: 1,
					text: "Watch 5 anime",
					note: "don't forget to smile",
					tag: undefined as undefined | number,
					checked: false,
					editing: false,
				},
				{
					id: 2,
					text: "Watch 7 anime",
					note: "don't forget to smile",
					tag: undefined as undefined | number,
					checked: false,
					editing: false,
				},
				{
					id: 3,
					text: "Watch 9 anime",
					note: "don't forget to smile",
					tag: undefined as undefined | number,
					checked: false,
					editing: false,
				},
			],
		},
		{
			id: 2,
			headline: "Headline",
			shown: true,
			goals: [
				{
					id: 0,
					text: "Watch 4 anime",
					note: "don't forget to smile",
					tag: undefined as undefined | number,
					checked: true,
					editing: false,
				},
				{
					id: 1,
					text: "Watch 5 anime",
					note: "don't forget to smile",
					tag: undefined as undefined | number,
					checked: false,
					editing: false,
				},
				{
					id: 2,
					text: "Watch 7 anime",
					note: "don't forget to smile",
					tag: undefined as undefined | number,
					checked: false,
					editing: false,
				},
			],
		},
	],
	tags: [
		{ name: "important", color: "#FF69B4" },
		{ name: "work", color: "#0000FF" },
	] as Array<TagType>,
	currentFolders: [0, 1, 2] as number[],
};

type StateType = typeof initialState;
export type TodosAction = ActionType<typeof actions>;

const reducer = (state = initialState, action: TodosAction): StateType => {
	switch (action.type) {
		case constants.TOGGLE_CHECKED: {
			const { id, folderId } = action.payload;
			return {
				...state,
				folders: reduceItem(state.folders, folderId, (folder) => {
					return {
						...folder,
						goals: folder.goals.map((goal, goalIndex) => {
							if (goalIndex === id) {
								return {
									...goal,
									checked: !goal.checked,
								};
							} else {
								return goal;
							}
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
								tag: undefined as undefined | number,
								checked: false,
								editing: false,
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
				setDrawerModeAction,
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
		case constants.SWAP_FOLDERS: {
			let { from, to } = action.payload;

			return {
				...state,
				folders: (to > from
					? [
							...state.folders.slice(0, from),
							...state.folders.slice(from + 1, to + 1),
							state.folders[from],
							...state.folders.slice(to + 1, state.folders.length),
					  ]
					: [
							...state.folders.slice(0, to),
							state.folders[from],
							...state.folders.slice(to, from),
							...state.folders.slice(from + 1, state.folders.length),
					  ]
				).map((folder, i) => ({ ...folder, id: i })),
			};
		}
		case constants.START_EDITING: {
			const { id, folderId } = action.payload;
			return {
				...state,
				folders: reduceItem(state.folders, folderId, (folder) => ({
					...folder,
					goals: folder.goals.map((goal, idx) => {
						if (idx !== id) return goal;
						return { ...goal, editing: !goal.editing };
					}),
				})),
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
							if (goal.tag === undefined || goal.tag < tagId) return goal;
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
				tags: [...state.tags, { name, color }],
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
		case constants.SET_CURRENT_FOLDERS: {
			const { from, folderId } = action.payload;
			return {
				...state,
				folders: state.folders.map((folder) => {
					if (folder.id === from) return { ...folder, shown: false };
					if (folder.id === folderId) return { ...folder, shown: true };
					return folder;
				}),
				currentFolders: state.currentFolders.map((id) => {
					if (id === from) return folderId;
					return id;
				}),
			};
		}
		case constants.SWAP_CURRENT_FOLDERS: {
			const { from, to } = action.payload;
			return {
				...state,
				currentFolders: state.currentFolders.map((id) => {
					if (id === from) return to;
					if (id === to) return from;
					return id;
				}),
			};
		}
		default:
			return state;
	}
};

export default reducer;
