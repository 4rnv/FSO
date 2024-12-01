import { useState } from 'react'

const Statistics = ({good,neutral,bad}) => {
  
  if(good+neutral+bad===0) {
    return (
      <>
      <h1>Statistics</h1>
      <p>No feedback given</p>
      </>
    )
  }
  const calcAverage = (good,neutral,bad) => {
    const average = (good*1 - bad*1)/(good+neutral+bad)
    return average
  }

  return (
    <>
    <h1>Statistics</h1>
    <p>Good: {good}</p>
    <p>Neutral: {neutral}</p>
    <p>Bad: {bad}</p>
    <p>All: {good+neutral+bad}</p>
    <p>Average: {calcAverage(good,neutral,bad)}</p>
    <p>Positive Percentage: {good*100/(good+neutral+bad)}%</p>
    </>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const incrementGood = () => {
    const newGood = good+1
    setGood(newGood)
    console.log('New Value Good',newGood)
  }
  const incrementNeutral = () => {
    const newNeutral = neutral+1
    setNeutral(newNeutral)
    console.log('New Value Neutral',newNeutral)
  }
  const incrementBad = () => {
    const newBad = bad+1
    setBad(newBad)
    console.log('New Value Bad',newBad)
  }

  return (
    <div>
      <h1>Give Feedback</h1>
      <button onClick={incrementGood}>Good</button>
      <button onClick={incrementNeutral}>Neutral</button>
      <button onClick={incrementBad}>Bad</button>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App