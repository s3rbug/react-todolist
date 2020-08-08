import { ActionType } from "typesafe-actions";
import * as actions from "../actions/todo";
import * as constants from "./../constants/todo";
import { reduceItem } from "../reduxStore";

const initialState = {
  folders: [
    {
      id: 0,
      headline: "Anime SUPERgoals",
      description: "About Anime SUPERgoals",
      goals: [
        {
          id: 0,
          text: "Watch 1 anime",
          checked: true,
          editing: false,
        },
        {
          id: 1,
          text: "Watch 2 anime",
          checked: false,
          editing: false,
        },
        {
          id: 2,
          text: "Watch 3 anime",
          checked: false,
          editing: false,
        },
      ],
    },
    {
      id: 1,
      headline: "SUPERgoals",
      description: "About this SUPERgoals",
      goals: [
        {
          id: 0,
          text: "Watch 4 anime",
          checked: true,
          editing: false,
        },
        {
          id: 1,
          text: "Watch 5 anime",
          checked: false,
          editing: false,
        },
        {
          id: 2,
          text: "Watch 7 anime",
          checked: false,
          editing: false,
        },
        {
          id: 3,
          text: "Watch 9 anime",
          checked: false,
          editing: false,
        },
      ],
    },
    {
      id: 2,
      headline: "Anime SUPERgoals2457",
      description: "About this SUPERgoals",
      goals: [
        {
          id: 0,
          text: "Watch 4 anime",
          checked: true,
          editing: false,
        },
        {
          id: 1,
          text: "Watch 5 anime",
          checked: false,
          editing: false,
        },
        {
          id: 2,
          text: "Watch 7 anime",
          checked: false,
          editing: false,
        },
      ],
    },
  ],
  currentFolderId: 0,
};

type StateType = typeof initialState;
export type TodosAction = ActionType<typeof actions>;

const reducer = (state = initialState, action: TodosAction): StateType => {
  switch (action.type) {
    case constants.SET_CURRENT_FOLDER: {
      const { id } = action.payload;
      return {
        ...state,
        currentFolderId: id,
      };
    }
    case constants.TOGGLE_CHECKED: {
      const { id } = action.payload;
      return {
        ...state,
        folders: reduceItem(state.folders, state.currentFolderId, (folder) => {
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
      const { text } = action.payload;
      const newGoal = {
        id: state.folders[state.currentFolderId].goals.length,
        text: text,
        checked: false,
        editing: false,
      };
      return {
        ...state,
        folders: reduceItem(state.folders, state.currentFolderId, (folder) => {
          return {
            ...folder,
            goals: [...folder.goals, newGoal],
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
      return {
        ...state,
        folders: reduceItem(state.folders, state.currentFolderId, (folder) => {
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
      const { description, headline } = action.payload;

      const newFolder = {
        id: state.folders.length,
        headline: headline,
        description: description,
        goals: [],
      };
      return {
        ...state,
        folders: [...state.folders, newFolder],
      };
    }
    case constants.SWAP_TASKS: {
      let { from, to } = action.payload;
      if (from === to) return state;
      return {
        ...state,
        folders: reduceItem(state.folders, state.currentFolderId, (folder) => ({
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
    case constants.STOP_EDITING: {
      return {
        ...state,
        folders: reduceItem(state.folders, state.currentFolderId, (folder) => ({
          ...folder,
          goals: folder.goals.map((goal) => ({ ...goal, editing: false })),
        })),
      };
    }
    case constants.START_EDITING: {
      const { id } = action.payload;
      return {
        ...state,
        folders: reduceItem(state.folders, state.currentFolderId, (folder) => ({
          ...folder,
          goals: folder.goals.map((goal, idx) => {
            if (idx !== id) return goal;
            return { ...goal, editing: !goal.editing };
          }),
        })),
      };
    }
    case constants.SET_GOAL: {
      const { id, newGoal } = action.payload;
      return {
        ...state,
        folders: reduceItem(state.folders, state.currentFolderId, (folder) => {
          return {
            ...folder,
            goals: folder.goals.map((goal, goalIdx) => {
              if (goalIdx !== id) return goal;
              return {
                ...goal,
                text: newGoal,
              };
            }),
          };
        }),
      };
    }
    default:
      return state;
  }
};

export default reducer;
