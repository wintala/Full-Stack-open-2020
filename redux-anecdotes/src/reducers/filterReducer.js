const reducer = (state = "", action) => {
    switch(action.type) {
        case "NEW_FILTER":
            return action.data.filter
        default:
            return state
    }
}

export const newFilter = (filter) => {
    return {
        type: "NEW_FILTER",
        data: {
            filter,
        }
    }
}

export default reducer