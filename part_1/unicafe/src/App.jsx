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
  const average = (good*1 - bad*1)/(good+neutral+bad);
  const sum = good+neutral+bad;
  let percentage = good*100/(good+neutral+bad);
  percentage=percentage+'%';

  return (
    <table>
    <h1>Statistics</h1>
    <StatisticLine text="Good:" value ={good} />
    <StatisticLine text="Neutral:" value ={neutral} />
    <StatisticLine text="Bad:" value ={bad} />
    <StatisticLine text="All:" value ={sum} />
    <StatisticLine text="Average" value ={average} />
    <StatisticLine text="Percentage: " value ={percentage} />
    </table>
  )
}

const StatisticLine = ({text,value}) => {
  return (
    <tr><td>{text}</td> <td>{value}</td></tr>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
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
      <Button text='Good' onClick={incrementGood}/>
      <Button text='Neutral' onClick={incrementNeutral}/>
      <Button text='Bad' onClick={incrementBad}/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App