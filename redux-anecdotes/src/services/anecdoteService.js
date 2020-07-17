import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const newAnecdote = async content => {
    const object = {content, votes: 0, id: (100000 * Math.random()).toFixed(0)}
    const response = await axios.post(baseUrl, object)
    return response.data
}

const voteAnecdote = async anecdote => {
    const response = await axios.put(`${baseUrl}/${anecdote.id}` , {...anecdote, votes: anecdote.votes + 1})
    return response.data
}

export default { getAll, newAnecdote, voteAnecdote }