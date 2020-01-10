const SET_APP_BAR_HEIGHT = "ui/SET_APP_BAR_HEIGHT";

const initialState = {
    appBarHeight: window.innerHeight * 0.07
}

const reducer = (state = initialState, action) => {
    if (action.type === SET_APP_BAR_HEIGHT) {
        return {
            ...state,
            appBarHeight: window.innerHeight * 0.07
        }
    }
    return state;
}

const setAppBarHeightSuccess = ({ type: SET_APP_BAR_HEIGHT })

export default reducer;