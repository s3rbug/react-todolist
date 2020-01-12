

const initialState = {
    folders: {
        anime: {
            id: 0,
            headline: "Anime goals",
            description: "About this goals",
            goals: [
                "Watch 1 anime",
                "Watch 2 anime",
                "Watch 3 anime"
            ]
        }
    }
}

function reducer(state = initialState, action) {
    return state;
}

export default reducer;