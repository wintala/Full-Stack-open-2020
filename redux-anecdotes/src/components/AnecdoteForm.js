import React from 'react'
import { useDispatch } from 'react-redux'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

const CreationForm = (props) => {
    const dispatch = useDispatch()

    const create = async event => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''

        dispatch(createAnecdote(content, 5))
      }

    return (
        <form onSubmit={create}>
            <div><input name="anecdote" /></div>
            <button>create</button>
        </form>
    )
}

const mapDispatchToProps = {
    createAnecdote
  }

const ConnectedCreationForm = connect(null, mapDispatchToProps)(CreationForm)

export default ConnectedCreationForm