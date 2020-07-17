import anecdoteService from "../services/anecdoteService";

const reducer = (state = [], action) => {
  switch(action.type) {
    case 'VOTE':
      const id = action.data.id
      const votedBlog = state.find(x => x.id === id)
      const blogAfterVote = {...votedBlog, votes: votedBlog.votes +1}
      return state.map(x => (x.id !== id ? x : blogAfterVote))
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'INIT_ANECDOTES':
      return action.data
    default:
        return state
  }
}

// tehtävänannosta kenties hieman poiketen yhteiset action cretorit anecdoottien operaatioille ja niiden ilmoituksille

export const createAnecdote = (content, notificationTime) => {
  return async dispatch => {
    const anecdote = await anecdoteService.newAnecdote(content)
    return dispatch({type: 'NEW_ANECDOTE', data: anecdote, notificationTime})
  }
}

export const voteAnecdote = (anecdote, notificationTime) => {
  return async dispatch => {
    const votedAnecdote = await anecdoteService.voteAnecdote(anecdote)
    return dispatch({type: 'VOTE', data: votedAnecdote, notificationTime})
  }
}

export const initAnecdotes = () => {
  return async dispatch => {
    const data = await anecdoteService.getAll()
    return dispatch({type: 'INIT_ANECDOTES', data})
  }
}



export default reducer