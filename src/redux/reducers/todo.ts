import { ActionType } from "typesafe-actions";
import * as actions from "../actions/todo";
import * as constants from "./../constants/todo";

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
      let foldersCopy = [...state.folders];
      let currentFolderCopy = { ...state.folders[state.currentFolderId] };
      currentFolderCopy.goals[id].checked = !currentFolderCopy.goals[id]
        .checked;
      foldersCopy[state.currentFolderId] = { ...currentFolderCopy };

      return {
        ...state,
        folders: [...foldersCopy],
      };
    }
    case constants.ADD_GOAL: {
      const { text } = action.payload;
      let foldersCopy = [...state.folders];
      const newGoal = {
        id: state.folders[state.currentFolderId].goals.length,
        text: text,
        checked: false,
        editing: false,
      };
      const newGoals = [...state.folders[state.currentFolderId].goals, newGoal];
      foldersCopy[state.currentFolderId].goals = [...newGoals];
      return {
        ...state,
        folders: [...foldersCopy],
      };
    }
    case constants.DELETE_FOLDER: {
      const { id } = action.payload;
      let foldersCopy = [...state.folders];
      foldersCopy = foldersCopy.filter((el) => {
        return id !== el.id;
      });
      for (let i = id; i < foldersCopy.length; ++i) {
        --foldersCopy[i].id;
      }
      return {
        ...state,
        folders: [...foldersCopy],
      };
    }
    case constants.DELETE_DONE: {
      let foldersCopy = [...state.folders];
      let currentGoals = [...state.folders[state.currentFolderId].goals];
      currentGoals = currentGoals.filter((el) => {
        return !el.checked;
      });
      for (let i = 0; i < currentGoals.length; ++i) {
        currentGoals[i].id = i;
      }
      foldersCopy[state.currentFolderId].goals = [...currentGoals];
      return {
        ...state,
        folders: [...foldersCopy],
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
      const { from, to } = action.payload;
      let foldersCopy = [...state.folders];
      let newGoals = [...state.folders[state.currentFolderId].goals];
      const [removed] = newGoals.splice(from, 1);
      newGoals.splice(to, 0, removed);

      for (let i = 0; i < newGoals.length; ++i) {
        newGoals[i].id = i;
      }

      foldersCopy[state.currentFolderId].goals = [...newGoals];
      return {
        ...state,
        folders: [...foldersCopy],
      };
    }
    case constants.SWAP_FOLDERS: {
      const { from, to } = action.payload;
      let newFolders = [...state.folders];

      const [removed] = newFolders.splice(from, 1);
      newFolders.splice(to, 0, removed);

      for (let i = 0; i < newFolders.length; ++i) {
        newFolders[i].id = i;
      }

      return {
        ...state,
        folders: [...newFolders],
      };
    }
    case constants.STOP_EDITING: {
      let goalsCopy = [...state.folders[state.currentFolderId].goals];
      let foldersCopy = [...state.folders];
      for (let i = 0; i < goalsCopy.length; ++i) {
        goalsCopy[i].editing = false;
      }
      foldersCopy[state.currentFolderId].goals = [...goalsCopy];
      return {
        ...state,
        folders: [...foldersCopy],
      };
    }
    case constants.START_EDITING: {
      const { id } = action.payload;
      let goalsCopy = [...state.folders[state.currentFolderId].goals];
      let foldersCopy = [...state.folders];
      goalsCopy[id].editing = !goalsCopy[id].editing;
      foldersCopy[state.currentFolderId].goals = [...goalsCopy];
      return {
        ...state,
        folders: [...foldersCopy],
      };
    }
    case constants.SET_GOAL: {
      const { id, newGoal } = action.payload;
      let foldersCopy = [...state.folders];
      foldersCopy[state.currentFolderId].goals[id].text = newGoal;
      return {
        ...state,
        folders: [...foldersCopy],
      };
    }
    default:
      return state;
  }
};

export default reducer;
