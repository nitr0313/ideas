
const defaultState = {
    notifies : []
}

export const notifiesReducer = (state = defaultState, action) => {
    switch (action.type) {
        case "ADD_NOTIFY":
            return {...state, notifies: [action.payload]}
        default:
            return state
    }
}