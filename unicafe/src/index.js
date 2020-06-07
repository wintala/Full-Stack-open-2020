import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const StatisticLine = props => (
  <tr>
    <td>{props.name}</td>
    <td>{props.value}</td>
  </tr>
)

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Statistics = props =>{
  const stats = props.choices
  const totalVotes = Object.values(stats).reduce((a,b) => a + b, 0)
  if(totalVotes === 0){
    return(<div>No stats yet</div>)
  }else{
    const average = (stats.good - stats.bad) / totalVotes
    const positivePerCent = stats.good / totalVotes
    return(
      <table>
        <tbody>
          <StatisticLine name={"neutral"} value={stats.neutral} />
          <StatisticLine name={"good"} value={stats.good} />
          <StatisticLine name={"bad"} value={stats.bad} />
          <StatisticLine name={"average"} value={average} />
          <StatisticLine name={"postives"} value={positivePerCent} />
        </tbody>
      </table>
    )
  }
}

const App = props => {
  const [choices, setNeutral] = useState({
    neutral: 0, good: 0, bad: 0
  })

  const handleClick = choice => {
    const newChoices = {...choices}
    newChoices[choice]++
    setNeutral(newChoices)
  }

  return (
    <div>
      <h2>Give review</h2>
      <Button handleClick={() => handleClick("neutral")} text="neutral" />
      <Button handleClick={() => handleClick("good")} text="good" />
      <Button handleClick={() => handleClick("bad")} text="bad" />
      <h2>Results</h2>
      <Statistics choices = {choices} />
    </div>
  )
}

ReactDOM.render(
  <App />, 
  document.getElementById('root')
)