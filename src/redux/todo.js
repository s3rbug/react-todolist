const SET_CURRENT_FOLDER = "todo/SET_CURRENT_FOLDER"
const TOGGLE_CHECKED = "todo/TOGGLE_CHECKED"


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
    else if (action.type === TOGGLE_CHECKED) { // !!!!!!!!!
        let stateCopy = { ...state }
        stateCopy.currentFolder.goals[action.id].checked = !stateCopy.currentFolder.goals[action.id].checked;
        return {
            ...state,
            currentFolder: { ...stateCopy.currentFolder }
        };
    }
    return state;
}

export const setCurrentFolderById = (id) => ({ type: SET_CURRENT_FOLDER, id })
export const toggleChecked = (id) => ({ type: TOGGLE_CHECKED, id })

export default reducer;