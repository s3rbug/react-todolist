const SET_CURRENT_FOLDER = "todo/SET_CURRENT_FOLDER"
const TOGGLE_CHECKED = "todo/TOGGLE_CHECKED"
const ADD_GOAL = "todo/ADD_GOAL"
const DELETE_FOLDER = "todo/DELETE_FOLDER"


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
                }
            ]
        },
        {
            id: 2,
            headline: "Anime SUPERgoals2",
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
    currentFolder: null
}

function reducer(state = initialState, action) {
    if (action.type === SET_CURRENT_FOLDER) {
        return {
            ...state,
            currentFolder: state.folders[action.id]
        }
    }
    else if (action.type === TOGGLE_CHECKED) {
        let stateCopy = { ...state }
        stateCopy.currentFolder.goals[action.id].checked = !stateCopy.currentFolder.goals[action.id].checked;
        return {
            ...state,
            currentFolder: { ...stateCopy.currentFolder }
        };
    }
    else if (action.type === ADD_GOAL) {
        let stateCopy = { ...state }
        const newGoal = {
            id: stateCopy.currentFolder.goals.length,
            text: action.text,
            checked: false
        }
        const newGoals = [...state.currentFolder.goals, newGoal];
        stateCopy.currentFolder.goals = newGoals
        return {
            ...stateCopy
        }
    }
    else if (action.type === DELETE_FOLDER) { ////
        let foldersCopy = [...state.folders]
        foldersCopy = foldersCopy.filter(el => {
            return action.id !== el.id
        })
        for (let i = action.id; i < foldersCopy.length; ++i) {
            --foldersCopy[i].id;
        }
        return {
            ...state,
            folders: foldersCopy
        }

    }
    return state;
}

export const setCurrentFolderById = (id) => ({ type: SET_CURRENT_FOLDER, id })
export const toggleChecked = (id) => ({ type: TOGGLE_CHECKED, id })
export const addGoal = (text) => ({ type: ADD_GOAL, text })
export const deleteFolder = (id) => ({ type: DELETE_FOLDER, id })

export default reducer;