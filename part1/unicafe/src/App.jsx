import { useState } from 'react'

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>)

const StatisticLine = ({ label, value }) => {
  return (
    <tr>
      <td>{label}</td><td>{value}</td>
    </tr>
  )
}
const Statistics = ({ good, neutral, bad }) =>  {
  let määrä = bad + good + neutral
  let average = (bad * -1 + good * 1) / määrä;
  let positive = good / määrä * 100

  if (määrä == 0){
    return(
    <div>
      <h2>statistics</h2>
      <p>No feedback given</p>
    </div>
    )
  }
  return (
      <div>
        <h2>statistics</h2>
        <table>
          <tbody>
            <StatisticLine label="good" value={good} />  
            <StatisticLine label="neutral" value={neutral} />
            <StatisticLine label="bad" value={bad} />
            <StatisticLine label="average" value={average} />
            <StatisticLine label="positive" value={positive} />
          </tbody>
        </table>
      </div>
    )
  
}
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
    
  }
  const handleGoodClick = () => {
    setGood(good + 1)
  }
  const handleBadClick = () => {
    setBad(bad + 1)
  }
  return (
    <div>
      <h2>give feedback</h2>
      <Button onClick={handleGoodClick} text='good' />
      <Button onClick={handleNeutralClick} text='neutral' />
      <Button onClick={handleBadClick} text='bad' />
      
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App

