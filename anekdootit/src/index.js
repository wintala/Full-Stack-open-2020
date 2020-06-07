import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Display = props => <div>{props.value}</div>

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(props.anecdotes.length).fill(0))

  const handleNext = () => {
    setSelected(Math.floor(Math.random() * props.anecdotes.length))
  }

  const hanldeVote = () => {
    const newVotes = [...votes]
    newVotes[selected]++
    setVotes(newVotes)
  }

  return (
    <>
      <h2>Anecdote of the day</h2>
      <Display value = {props.anecdotes[selected]}/>
      <br></br>
      <Display value = {`Voted ${votes[selected]} times`}/>
      <div>
        <Button handleClick={handleNext} text="next(random)" />
        <Button handleClick={hanldeVote} text="vote" />
      </div>
      <br></br>
      <h2>Most votes</h2>
      <Display value = {props.anecdotes[votes.indexOf(Math.max(...votes))]} />
    </>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)