const reducer = (state = {text: "", time: 0}, action) => {

    switch(action.type) {
        case 'VOTE':
            const votedAnecdote = action.data.content
            return {text: `Voted: '${votedAnecdote}'`, time: action.notificationTime * 1000}
        case 'NEW_ANECDOTE':
            const createdAnecdote = action.data.content
            return {text: `Created: '${createdAnecdote}'`, time: action.notificationTime * 1000}
        case 'HIDE_MESSAGE':
            return {text: "", time: 0}
        default:
            return state
    }
}



export const hideNotification = () => {
    return {
      type: "HIDE_MESSAGE"
  }
}

export default reducer