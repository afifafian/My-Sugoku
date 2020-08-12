const initialState = {
    boards: [],
    boardTemplate: [],
    level: "easy",
    status: "unsolved",
    loading: true,
}

function boardReducer (state = initialState, action) {
    switch (action.type) {
        case "SET_BOARD":
            return {
                ...state, 
                boards: action.payload,
                boardTemplate: JSON.parse(JSON.stringify(action.payload)),
                status: "unsolved"
            }
        case "UPDATE_BOARD":
            return {...state, boards: action.payload}
        case "SOLVED_BOARD":
            return {...state, 
                boardTemplate: action.payload.board, 
                boards: action.payload.board, 
                status: action.payload.status}
        case "SET_STATUS":
            return {...state, status: action.payload}
        case "SET_LEVEL":
            return {...state, level: action.payload}
        case "DISPLAY_LOADING":
            return {...state, loading: action.payload}
        case "HIDE_LOADING":
            return {...state, loading: action.payload}
        default:
            return state;
    }
}

export default boardReducer;