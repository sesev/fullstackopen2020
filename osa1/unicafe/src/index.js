import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text}) => (
  <button onClick={onClick}>{text}</button>
)
const StatisticsLine = ({text, value}) => (
  <tr><td>{text}</td><td>{value}</td></tr>

)
const Statistics = ({good, neutral, bad, allClicks}) =>{
  const all = good + neutral + bad
  const positive = (good * 100 / all ).toFixed(2)
  const average = (((good) + (neutral * 0) + (bad * -1)) / all).toFixed(1)

  if (allClicks.length === 0) {
    return (
         <p>No feedback given</p>
    )}
    return(
      <table>
        <tbody>
        <StatisticsLine text="Good" value={good}/>
        <StatisticsLine text="Neutral" value={neutral}/>
        <StatisticsLine text="Bad" value={bad}/>
        <StatisticsLine text="All" value={all}/>
        <StatisticsLine text="Average" value={average}/>
        <StatisticsLine text="Positive" value={positive + "%"} />
        </tbody>
        </table>
    )
    }


const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allClicks, setAll] = useState([])
  const handleGoodClick = () => { 
       setAll(allClicks.concat('G'))
      setGood(good + 1)  }

  const handleNeutralClick = () => {
        setAll(allClicks.concat('N'))
        setNeutral(neutral + 1)  }

  const handleBadClick = () => {
          setAll(allClicks.concat('B'))
          setBad(bad + 1)  }
  
 
  return (
    <div>
         <h1>Give feedback:</h1>
        <Button onClick={handleGoodClick} text='Good' />
        <Button onClick={handleNeutralClick} text='Neutral' />
        <Button onClick={handleBadClick} text='Bad' />
        <h1>Statistics:</h1>
        <Statistics good={good} neutral={neutral} bad={bad} allClicks={allClicks}/>

    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
