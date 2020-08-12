const initialState = {
    playerName: "player"
}

function playerReducer (state = initialState, action) {
    switch (action.type) {
        case "GET_PLAYER":
            return {...state, playerName: action.payload}
        default:
            return state;
    }
}

export default playerReducer;