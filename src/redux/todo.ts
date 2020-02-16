const SET_CURRENT_FOLDER = "todo/SET_CURRENT_FOLDER";
const TOGGLE_CHECKED = "todo/TOGGLE_CHECKED";
const ADD_GOAL = "todo/ADD_GOAL";
const DELETE_FOLDER = "todo/DELETE_FOLDER";
const DELETE_DONE = "todo/DELETE_DONE";
const ADD_FOLDER = "todo/ADD_FOLDER";
const SWAP_TASKS = "todo/SWAP_TASKS";
const SWAP_FOLDERS = "todo/SWAP_FOLDERS";

type GoalType = {
  id: number;
  text: string;
  checked: boolean;
};

type FolderType = {
  id: number;
  headline: string;
  description: string;
  goals: Array<GoalType>;
};

type StateType = {
  folders: Array<FolderType>;
  currentFolder: FolderType;
};

const initialState = {
  folders: [
    {
      id: 0,
      headline: "Anime goals",
      description: "About this goals",
      goals: [
        {
          id: 0,
          text: "Watch 1 anime",
          checked: true
        },
        {
          id: 1,
          text: "Watch 2 anime",
          checked: false
        },
        {
          id: 2,
          text: "Watch 3 anime",
          checked: false
        }
      ]
    },
    {
      id: 1,
      headline: "Anime SUPERgoals",
      description: "About this SUPERgoals",
      goals: [
        {
          id: 0,
          text: "Watch 4 anime",
          checked: true
        },
        {
          id: 1,
          text: "Watch 5 anime",
          checked: false
        },
        {
          id: 2,
          text: "Watch 7 anime",
          checked: false
        },
        {
          id: 3,
          text: "Watch 9 anime",
          checked: false
        }
      ]
    },
    {
      id: 2,
      headline: "Anime SUPERgoals2457",
      description: "About this SUPERgoals",
      goals: [
        {
          id: 0,
          text: "Watch 4 anime",
          checked: true
        },
        {
          id: 1,
          text: "Watch 5 anime",
          checked: false
        },
        {
          id: 2,
          text: "Watch 7 anime",
          checked: false
        }
      ]
    }
  ],
  currentFolder: {
    id: 0,
    headline: "Anime goals",
    description: "About this goals",
    goals: [
      {
        id: 0,
        text: "Watch 1 anime",
        checked: true
      },
      {
        id: 1,
        text: "Watch 2 anime",
        checked: false
      },
      {
        id: 2,
        text: "Watch 3 anime",
        checked: false
      }
    ]
  }
};

function sync(state: any, folder: any) {
  state.folders[state.currentFolder.id] = folder;
}

function reducer(state = initialState, action: any): StateType {
  if (action.type === SET_CURRENT_FOLDER) {
    return {
      ...state,
      currentFolder: state.folders[action.id]
    };
  } else if (action.type === TOGGLE_CHECKED) {
    let currentFolderCopy = { ...state.currentFolder };
    currentFolderCopy.goals[action.id].checked = !currentFolderCopy.goals[
      action.id
    ].checked;
    sync(state, currentFolderCopy);
    return {
      ...state,
      currentFolder: currentFolderCopy
    };
  } else if (action.type === ADD_GOAL) {
    let currentFolderCopy = { ...state.currentFolder };
    const newGoal = {
      id: state.currentFolder.goals.length,
      text: action.text,
      checked: false
    };
    const newGoals = [...currentFolderCopy.goals, newGoal];
    currentFolderCopy.goals = newGoals;
    sync(state, currentFolderCopy);
    return {
      ...state,
      currentFolder: currentFolderCopy
    };
  } else if (action.type === DELETE_FOLDER) {
    let foldersCopy = [...state.folders];
    foldersCopy = foldersCopy.filter(el => {
      return action.id !== el.id;
    });
    for (let i = action.id; i < foldersCopy.length; ++i) {
      --foldersCopy[i].id;
    }
    return {
      ...state,
      folders: foldersCopy
    };
  } else if (action.type === DELETE_DONE) {
    let currentGoals = [...state.currentFolder.goals];
    currentGoals = currentGoals.filter(el => {
      return !el.checked;
    });
    for (let i = 0; i < currentGoals.length; ++i) {
      currentGoals[i].id = i;
    }
    sync(state, {
      ...state.currentFolder,
      goals: currentGoals
    });
    return {
      ...state,
      currentFolder: {
        ...state.currentFolder,
        goals: currentGoals
      }
    };
  } else if (action.type === ADD_FOLDER) {
    const newFolder = {
      id: state.folders.length,
      headline: action.headline,
      description: action.description,
      goals: []
    };
    return {
      ...state,
      folders: [...state.folders, newFolder]
    };
  } else if (action.type === SWAP_TASKS) {
    let newGoals = [...state.currentFolder.goals];
    const [removed] = newGoals.splice(action.from, 1);
    newGoals.splice(action.to, 0, removed);

    for (let i = 0; i < newGoals.length; ++i) {
      newGoals[i].id = i;
    }

    sync(state, { ...state.currentFolder, goals: [...newGoals] });

    return {
      ...state,
      currentFolder: {
        ...state.currentFolder,
        goals: [...newGoals]
      }
    };
  } else if (action.type === SWAP_FOLDERS) {
    let newFolders = [...state.folders];

    const [removed] = newFolders.splice(action.from, 1);
    newFolders.splice(action.to, 0, removed);

    for (let i = 0; i < newFolders.length; ++i) {
      newFolders[i].id = i;
    }

    return {
      ...state,
      folders: [...newFolders]
    };
  }
  return state;
}

type SetFolderType = {
  type: typeof SET_CURRENT_FOLDER;
  id: number;
};

type ToggleCheckedType = {
  type: typeof TOGGLE_CHECKED;
  id: number;
};

type AddGoalType = {
  type: typeof ADD_GOAL;
  text: string;
};

type DeleteFolderType = {
  type: typeof DELETE_FOLDER;
  id: number;
};

type DeleteDoneType = {
  type: typeof DELETE_DONE;
};

type AddFolderType = {
  type: typeof ADD_FOLDER;
  headline: string;
  description: string;
};

type SwapTasksType = {
  type: typeof SWAP_TASKS;
  from: number;
  to: number;
};

type SwapFoldersType = {
  type: typeof SWAP_FOLDERS;
  from: number;
  to: number;
};

export const setCurrentFolderById = (id: number): SetFolderType => ({
  type: SET_CURRENT_FOLDER,
  id
});
export const toggleChecked = (id: number): ToggleCheckedType => ({
  type: TOGGLE_CHECKED,
  id
});
export const addGoal = (text: string): AddGoalType => ({
  type: ADD_GOAL,
  text
});
export const deleteFolder = (id: number): DeleteFolderType => ({
  type: DELETE_FOLDER,
  id
});
export const deleteDone = (): DeleteDoneType => ({ type: DELETE_DONE });
export const addFolder = (
  headline: string,
  description: string
): AddFolderType => ({
  type: ADD_FOLDER,
  headline,
  description
});
export const swapTasks = (from: number, to: number): SwapTasksType => ({
  type: SWAP_TASKS,
  from,
  to
});
export const swapFolders = (from: number, to: number): SwapFoldersType => ({
  type: SWAP_FOLDERS,
  from,
  to
});

export default reducer;
