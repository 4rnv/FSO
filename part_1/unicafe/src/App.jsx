import { useState } from 'react'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const incrementGood = () => {
    setGood(good+1)
    console.log('New Value Good',good)
  }
  const incrementNeutral = () => {
      setNeutral(neutral+1)
      console.log('New Value Neutral',neutral)
  }
  const incrementBad = () => {
      setBad(bad+1)
      console.log('New Value Bad',bad)
  }

  const calcAverage = (good,neutral,bad) => {
    const average = (good*1 - bad*1)/(good+neutral+bad)
    return average
  }

  return (
    <div>
      <h1>Give Feedback</h1>
      <button onClick={incrementGood}>Good</button>
      <button onClick={incrementNeutral}>Neutral</button>
      <button onClick={incrementBad}>Bad</button>
      <h1>Statistics</h1>
      <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>
      <p>All: {good+neutral+bad}</p>
      <p>Average: {calcAverage(good,neutral,bad)}</p>
      <p>Positive Percentage: {good*100/(good+neutral+bad)}%</p>
    </div>
  )
}

export default App