import React from 'react'
import { connect } from 'react-redux'
import {voteAnecdote} from '../reducers/anecdoteReducer'

const Anecdotes = (props) => {

    const vote = (anecdote) => {
        props.voteAnecdote(anecdote, 5)
      }
    
    const filteredAnecdotes = props.anecdotes.filter(x => x.content.toLowerCase().includes(props.filter.toLowerCase()))

    return (
        <>
            {filteredAnecdotes.sort((a, b) => b.votes - a.votes ).map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote)}>vote</button>
                    </div>
                </div>
            
            )}
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        anecdotes: state.anecdotes,
        filter: state.filter,
    }
}

const mapDispatchToProps = {
    voteAnecdote
  }

const ConnectedAnecdotes = connect(mapStateToProps, mapDispatchToProps)(Anecdotes)

export default ConnectedAnecdotes
